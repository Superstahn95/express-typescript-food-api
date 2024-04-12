import { RequestHandler } from "express";
import validator from "../validator";
import { orderSchema } from "./orderSchema";

export const placeOrderValidation: RequestHandler = (req, res, next) => {
  validator(orderSchema.placeOrder, { ...req.body }, next);
};
