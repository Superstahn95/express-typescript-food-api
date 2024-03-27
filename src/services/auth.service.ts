import { Request, Response, NextFunction } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import { User } from "../models";
import { environmentConfig } from "../configs";
import { customResponse } from "../utils";

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
    console.log("user saved");
    //create token and send out token along with the user
    res.status(201).json(
      customResponse({
        data: user,
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
    console.log("we got the user");
    //check if password is a match
    const isPasswordMatch: boolean = await user.comparePassword(password);
    console.log("we have compared passwords");
    if (!isPasswordMatch) {
      //send back an error here
      return next(createHttpError(400, "Invalid credentials"));
    }
    //create a jsonwebtoken

    //send back user
    res
      .status(200)
      .json(
        customResponse({
          data: user,
          error: false,
          message: "ok",
          status: 200,
          success: true,
        })
      );
  } catch (error) {
    console.log("error in our catch block.....");
    console.log(error);
    next(InternalServerError);
  }
};
