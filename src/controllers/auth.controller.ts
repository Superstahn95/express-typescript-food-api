import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  loginService,
  signUpService,
  logoutService,
  refreshTokenService,
  refetchUserService,
  mobileLoginService,
  mobileRegisterService,
} from "../services";
import { IUser, AuthenticatedRequestBody } from "../interfaces";

export const signUpController = (
  req: Request,
  res: Response,
  next: NextFunction
) => signUpService(req, res, next);

export const loginController = (
  req: Request,
  res: Response,
  next: NextFunction
) => loginService(req, res, next);

export const refeshTokenController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  refreshTokenService(req, res, next);
};

export const refetchUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  refetchUserService(req, res, next);
};

export const mobileLoginController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  mobileLoginService(req, res, next);
};

export const mobileSignUpController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  mobileRegisterService(req, res, next);
};

export const logoutController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logoutService(req, res, next);
};
