import { Request, Response, NextFunction, RequestHandler } from "express";
import { loginService, signUpService, refreshTokenService } from "../services";
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
