import { Request, Response, NextFunction } from "express";
import { verifyPaymentService } from "../services";

export const verifyPaymentController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyPaymentService(req, res, next);
};
