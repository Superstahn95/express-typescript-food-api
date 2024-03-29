import { Request, Response, NextFunction } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import jwt from "jsonwebtoken";
import { environmentConfig } from "../../configs";
import { User } from "../../models";
import { IAuthRequest } from "../../interfaces";

export const isAuth = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization; //Bearer Token
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return next(createHttpError(401, "unauthorized"));
  }
  try {
    const decodedToken = jwt.verify(
      token,
      environmentConfig.ACCESS_TOKEN_SECRET_KEY as string
    ) as jwt.JwtPayload;
    if (!decodedToken) {
      return next(createHttpError(401, "unauthorized"));
    }
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      return next(createHttpError(401, "Unauthorized"));
    }
    //trying to assign a value to req.user but getting a flag that property user does not exist on the req object
    req.user = user;
    next();
  } catch (error: any) {
    //specifying a specific error type should be cool here
    console.log(`we caught an error with this ${error.name}`);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return next(createHttpError(401, "Unauthorized"));
    }
    next(InternalServerError);
  }
};

export const refreshTokenCheck = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies["refresh_token"];
  if (!refreshToken) {
    return next(createHttpError(401, "unauthenticated"));
  }
  try {
    //verify refresh token
    const decodedToken = jwt.verify(
      refreshToken,
      environmentConfig.REFRESH_TOKEN_SECRET_KEY as string
    ) as jwt.JwtPayload;
    if (!decodedToken) {
      return next(createHttpError(401, "unauthorized"));
    }
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      return next(createHttpError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch (error: any) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return next(createHttpError(401, "Unauthorized"));
    }
    next(InternalServerError);
  }
};
