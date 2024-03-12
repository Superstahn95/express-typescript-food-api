import { NextFunction } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import createError from "http-errors";
import Joi from "joi";

const validator = (
  schema: Joi.ObjectSchema,
  body: Object,
  next: NextFunction
) => {
  const result = schema.validate(body, {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  });
  try {
  } catch (error) {
    console.log(error);
  }
  if (result.error) {
    // console.log("abbout triggering the next function");
    // throw new Error("Validation failed");
    const err = createHttpError(422, result.error.details[0].message);
    console.log(err.message);
    return next(err);
  } else {
    next();
  }
  // result.error
  // ? next(createHttpError(422, result.error.details[0].message))
  // : next();
  //   if (error) {
  //     process.env.NODE_ENVRIONMENT &&
  //       process.env.NODE_ENVIRONMENT === "development" &&
  //       console.log(error);
  //     console.log("This is the error message.....");
  //     call the global error handler here
  //     const errorObject = {
  //       statusCode: 422,
  //       message: error.details[0].message,
  //     };
  //     return next(errorObject);

  //   }
  //   next();
};

export default validator;
