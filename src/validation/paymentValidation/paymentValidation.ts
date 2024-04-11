import { RequestHandler } from "express";
import validator from "../validator";
import { paymentSchema } from "./paymentSchema";

export const verifyPaymentValidation: RequestHandler = (req, res, next) => {
  console.log(req.body);
  validator(paymentSchema.verifyPayment, { ...req.body }, next);
};
