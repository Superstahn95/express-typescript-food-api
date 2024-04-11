import { Request, Response, NextFunction } from "express";
import axios from "axios";
import createHttpError, { InternalServerError } from "http-errors";
import { customResponse } from "../utils";
import { environmentConfig } from "../configs";

export const verifyPaymentService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //a reference will be sent along with the request
  //need to send in an amount along with the request body to cross check
  const { reference, amount } = req.body;
  const headers = {
    Authorization: `Bearer ${environmentConfig.PAYSTACK_SECRET_KEY}`,
  };
  try {
    //make a call to the paystack verify end point
    const { data } = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers }
    );
    console.log("data object was gotten");
    if (data.staus === "sucess" && data.amount >= amount) {
      res.status(200).json(
        customResponse({
          data: true,
          error: false,
          message: "payment verified",
          status: 200,
          success: true,
        })
      );
    } else {
      next(createHttpError(400, "Payment was not verified"));
    }
  } catch (error: any) {
    console.log(error.response.data.message);
    if (
      error.response.data.message &&
      error.response.data.message === "Transaction reference not found"
    ) {
      return next(createHttpError(400, "Payment was not verified"));
    }
    next(InternalServerError);
  }
};
