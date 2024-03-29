import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  password: string;
}

export interface IAuthRequest extends Request {
  user?: IUser;
}
