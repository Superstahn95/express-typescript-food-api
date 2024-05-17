import { Request, Response, NextFunction } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import { User } from "../models";
import { environmentConfig } from "../configs";
import { customResponse } from "../utils";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { IUser, AuthenticatedRequestBody } from "../interfaces";

export const signUpService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // desructure data contained in the body of the request
  const { firstName, lastName, email, number, password } = req.body;
  console.log("we just hit here");
  try {
    const existingUser = await User.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });
    if (existingUser) {
      //return an error
      return next(createHttpError(401, "Email already belongs to an account"));
    }
    console.log("There is no existing user, so we are hitting this route");
    const newUser = new User({
      firstName,
      lastName,
      email,
      number,
      password,
    });
    const user = await newUser.save();
    // const {password, ...otherUserInfo} = user
    //create token and send out token along with the user
    const accessToken = sign(
      { id: user._id },
      environmentConfig.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: environmentConfig.ACCESS_TOKEN_EXPIRY_TIME as string }
    );
    const refreshToken = sign(
      { id: user._id },
      environmentConfig.REFRESH_TOKEN_SECRET_KEY as string,
      { expiresIn: environmentConfig.REFRESH_TOKEN_EXPIRY_TIME as string }
    );
    const responseData = {
      token: accessToken,
      user,
    };
    //set refresh token as as a cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENVIRONMENT === "production",
    });
    res.status(201).json(
      customResponse({
        data: responseData,
        error: false,
        message: "ok",
        status: 201,
        success: true,
      })
    );
  } catch (error) {
    console.log("This is my error in my catch block.....");
    console.log(error);
    next(InternalServerError);
  }
};

export const loginService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
    if (!user) {
      //send back error here
      return next(createHttpError(400, "Invalid credentials"));
    }
    //check if password is a match
    const isPasswordMatch: boolean = await user.comparePassword(password);

    if (!isPasswordMatch) {
      //send back an error here
      return next(createHttpError(400, "Invalid credentials"));
    }
    const accessToken = sign(
      { id: user._id },
      environmentConfig.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: environmentConfig.ACCESS_TOKEN_EXPIRY_TIME as string }
    );
    const refreshToken = sign(
      { id: user._id },
      environmentConfig.REFRESH_TOKEN_SECRET_KEY as string,
      { expiresIn: environmentConfig.REFRESH_TOKEN_EXPIRY_TIME as string }
    );

    const responseData = {
      token: accessToken,
      user,
    };
    res
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENVIRONMENT === "production",
        sameSite: "none",
      })
      .status(200)
      .json(
        customResponse({
          data: responseData,
          error: false,
          message: "ok",
          status: 200,
          success: true,
        })
      );
  } catch (error) {
    console.log(error);
    next(InternalServerError);
  }
};

export const refreshTokenService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  //our request is going to have a user property
  try {
    const accessToken = sign(
      { id: req.user?._id },
      environmentConfig.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: environmentConfig.ACCESS_TOKEN_EXPIRY_TIME as string }
    );
    const responseData = { token: accessToken };
    res.status(200).json(
      customResponse({
        data: responseData,
        error: false,
        success: true,
        message: "ok",
        status: 200,
      })
    );
  } catch (error) {
    next(InternalServerError);
  }
};

export const refetchUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies["refresh_token"];
  if (!refreshToken) {
    console.log("There is an absence of refresh token");
    return next(createHttpError(400, "no auth token sent"));
  }
  try {
    const decodedToken = verify(
      refreshToken,
      environmentConfig.REFRESH_TOKEN_SECRET_KEY as string
    ) as JwtPayload;
    if (!decodedToken) {
      return next(createHttpError(401, "unauthorized"));
    }
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      return next(createHttpError(401, "Unauthorized"));
    }
    //create an access token
    const accessToken = sign(
      { id: user._id },
      environmentConfig.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: environmentConfig.ACCESS_TOKEN_EXPIRY_TIME as string }
    );
    const responseData = { user, token: accessToken };
    res.status(200).json(
      customResponse({
        data: responseData,
        error: false,
        message: "user fetched",
        status: 200,
        success: true,
      })
    );
  } catch (error) {
    next(InternalServerError);
  }
};

export const mobileLoginService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
    if (!user) {
      //send back error here
      return next(createHttpError(400, "Invalid credentials"));
    }
    //check if password is a match
    const isPasswordMatch: boolean = await user.comparePassword(password);

    if (!isPasswordMatch) {
      //send back an error here
      return next(createHttpError(400, "Invalid credentials"));
    }
    const accessToken = sign(
      { id: user._id },
      environmentConfig.ACCESS_TOKEN_SECRET_KEY as string
    );

    const responseData = {
      token: accessToken,
      user,
    };
    res.status(200).json(
      customResponse({
        data: responseData,
        error: false,
        message: "ok",
        status: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    next(InternalServerError);
  }
};

export const mobileRegisterService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, number, password } = req.body;
  console.log("we just hit here");
  try {
    const existingUser = await User.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });
    if (existingUser) {
      //return an error
      return next(createHttpError(401, "Email already belongs to an account"));
    }
    console.log("There is no existing user, so we are hitting this route");
    const newUser = new User({
      firstName,
      lastName,
      email,
      number,
      password,
    });
    const user = await newUser.save();
    // const {password, ...otherUserInfo} = user
    //create token and send out token along with the user
    const accessToken = sign(
      { id: user._id },
      environmentConfig.ACCESS_TOKEN_SECRET_KEY as string
    );

    const responseData = {
      token: accessToken,
      user,
    };
    res.status(201).json(
      customResponse({
        data: responseData,
        error: false,
        message: "ok",
        status: 201,
        success: true,
      })
    );
  } catch (error) {
    console.log("This is my error in my catch block.....");
    console.log(error);
    next(InternalServerError);
  }
};

export const logoutService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("refresh_token");
    res
      .status(200)
      .json(
        customResponse({
          data: "log out successful",
          error: false,
          message: "ok",
          status: 200,
          success: true,
        })
      );
  } catch (error) {
    next(InternalServerError);
  }
};
