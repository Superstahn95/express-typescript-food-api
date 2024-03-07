import { NextFunction } from "express";
import Joi from "joi";

const validator = (
  schema: Joi.ObjectSchema,
  body: Object,
  next: NextFunction
) => {
  const { error, value } = schema.validate(body, {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  });
  if (error) {
    process.env.NODE_ENVRIONMENT &&
      process.env.NODE_ENVIRONMENT === "development" &&
      console.log(error);
    console.log(error.details[0].message);
    //call the global error handler here
  }
  next();
};

export default validator;
