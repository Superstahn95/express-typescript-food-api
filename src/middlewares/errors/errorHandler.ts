import { ErrorRequestHandler, Response } from "express";
import { ErrorResponse } from "../../interfaces";

// (alias) interface ErrorRequestHandler<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = qs.ParsedQs, Locals extends Record<string, any> = Record<string, any>>
// import ErrorRequestHandler

export const errorHandlerMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res: Response<ErrorResponse>,
  next
) => {
  const statusCode: number = err.statusCode || 500;

  res.status(statusCode).json({
    data: null,
    error: true,
    success: false,
    message: err.message || "Internal server error",
    status: statusCode,
    stack: process.env.NODE_ENVIRONMENT === "production" ? "" : err.stack,
  });
};

export default errorHandlerMiddleware;

// import { ErrorRequestHandler, NextFunction, Response } from 'express';
// import { ErrorResponse } from '@src/interfaces';

// export const errorHandlerMiddleware: ErrorRequestHandler = (
//   error,
//   req,
//   res: Response<ErrorResponse>,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   next: NextFunction
// ) => {
//   const statusCode = error.statusCode || 500;
//   res?.status(statusCode).send({
//     data: null,
//     success: false,
//     error: true,
//     message: error.message || 'Internal Server Error',
//     status: statusCode,
//     stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
//   });
// };

// export default errorHandlerMiddleware;
