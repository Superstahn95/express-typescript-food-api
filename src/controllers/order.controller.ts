import { Request, Response, NextFunction } from "express";
import { createOrderService } from "../services";
import { AuthenticatedRequestBody, IOrder } from "../interfaces";

export const placeOrderController = (
  req: AuthenticatedRequestBody<IOrder>,
  res: Response,
  next: NextFunction
) => {
  createOrderService(req, res, next);
};
