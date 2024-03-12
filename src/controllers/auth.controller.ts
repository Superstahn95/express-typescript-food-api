import { Request, Response, NextFunction, RequestHandler } from "express";
import { loginService, signUpService } from "../services";

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
