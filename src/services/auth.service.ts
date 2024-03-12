import { Request, Response, NextFunction } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import { User } from "../models";
import { environmentConfig } from "../configs";

export const signUpService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // desructure data contained in the body of the request
  const { firstName, lastName, email, number, password } = req.body;
  console.log(
    "we are here in the signIn seervcie and an error should be called next..."
  );
  return next(InternalServerError);
  try {
    const existingUser = await User.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });
    if (!existingUser) {
      //return an error
      return createHttpError(409, "Email already belongs to an account");
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      number,
      password,
    });
    const user = await newUser.save();
    //create token and send out token along with the user
    res.status(201).json(user);
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
      return;
    }
    //check if password is a match
    const isPasswordMatch: boolean = await user.comparePassword(password);
    if (!isPasswordMatch) {
      //send back an error here
      return;
    }
    //create a jsonwebtoken

    //send back user
    res.status(200).json(user);
  } catch (error) {
    console.log("error in our catch block.....");
    console.log(error);
    next(InternalServerError);
  }
};
