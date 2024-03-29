import { Request, Response, NextFunction } from "express";
import cors from "cors";
import { allowedOrigins } from "../../configs";

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // origin is a string or undefined type
    // (err: Error | null, origin?: StaticOrigin | undefined)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("This should throw a cors error");
      throw new Error("Origin is not allowed");
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
});
