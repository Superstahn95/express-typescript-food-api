import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../interfaces";

interface IUserDocument extends IUser {}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "First name is required"],
      minlength: [3, "First name must not be less than 3 characters"],
      maxlength: [15, "Last name must not be greater than 15 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "First name is required"],
      minlength: [3, "First name must not be less than 3 characters"],
      maxlength: [15, "Last name must not be greater than 15 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Last name is required"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      maxLength: [128, "Email can't be greater than 128 characters"],
      index: false,
    },
    number: {
      type: String,
      trim: true,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);

const User = model<IUserDocument>("User", userSchema);

export default User;
