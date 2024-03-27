import express, { NextFunction, Request, Response } from "express";
import { InternalServerError } from "http-errors";
import { customResponse } from "../utils";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message =
      "Welcome to my food api for my express and typescript build  - 👋🌎🌍🌏 - health check confirm!!";
    res.status(200).json(
      customResponse<string>({
        data: message,
        error: false,
        message: "ok",
        status: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    next(InternalServerError);
  }

  // res.send(message);
});

export default router;
