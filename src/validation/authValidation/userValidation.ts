import { RequestHandler } from "express";
import validator from "../validator";
import { userSchema } from "./userSchema";

export const signUpValidation: RequestHandler = (req, res, next) => {
  validator(userSchema.registerUser, req.body, next);
};

export const loginValidation: RequestHandler = (req, res, next) => {
  validator(userSchema.loginUser, req.body, next);
};
