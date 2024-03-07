import Joi from "joi";

//creating schema for different user features
export const userSchema = {
  registerUser: Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    number: Joi.number().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  loginUser: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
