import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces";
import { environmentConfig } from "../configs";

interface IUserDocument extends IUser {
  sayHI: () => void;
  comparePassword: (password: string) => Promise<boolean>;
  createJWT: () => string;
}

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

//method for hashing password before persisting user to database
userSchema.pre("save", async function (next) {
  if (
    process.env.NODE_ENVIRONMENT &&
    process.env.NODE_ENVIRONMENT === "development"
  ) {
    console.log("Middleware called before saving document is ", this);

    const user = this;
    //check this!!!!
    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
  next();
});

//test schema method for sending hi to my console
userSchema.methods.sayHI = function () {
  console.log("Hi User");
};

//method for comparing passwords
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

//creating a jsonwebtoken
userSchema.methods.createJWT = function (): string {
  const payload = {
    userId: this._id,
    email: this.email,
  };

  // return jwt.sign(payload, environmentConfig.TOKEN_SECRET as string, {
  //   expiresIn: environmentConfig.JWT_EXPIRE_TIME,
  // });
  return jwt.sign(payload, environmentConfig.TOKEN_SECRET as string);
};

export const User = model<IUserDocument>("User", userSchema);
