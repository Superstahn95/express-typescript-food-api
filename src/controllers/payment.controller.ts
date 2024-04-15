import { Request, Response, NextFunction } from "express";
import {
  verifyPaymentService,
  createPaymentCheckoutService,
  handlePaystackWebhookService,
} from "../services";
import { AuthenticatedRequestBody, IOrder } from "../interfaces";

export const verifyPaymentController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyPaymentService(req, res, next);
};

export const createPaystackCheckoutController = (
  req: AuthenticatedRequestBody<IOrder>,
  res: Response,
  next: NextFunction
) => {
  createPaymentCheckoutService(req, res, next);
};

export const handlePayStackWebhookController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handlePaystackWebhookService(req, res, next);
};
