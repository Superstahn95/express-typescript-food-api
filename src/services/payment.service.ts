import { Request, Response, NextFunction } from "express";
import axios from "axios";
import crypto from "crypto";
import createHttpError, { InternalServerError } from "http-errors";
import { customResponse } from "../utils";
import { environmentConfig } from "../configs";
import { AuthenticatedRequestBody, IUser, IOrder } from "../interfaces";
import { Order, User, Meal } from "../models";

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

export const createPaymentCheckoutService = async (
  req: AuthenticatedRequestBody<IOrder>,
  res: Response,
  next: NextFunction
) => {
  const { deliveryInfo, totalAmount, orderedMeals } = req.body;
  console.log("we are in the checkout service");
  try {
    const authenticatedUser = await User.findById(req.user?._id);
    if (!authenticatedUser)
      return next(createHttpError(401, "failed authentication"));

    //check if there are products ordered
    if (!orderedMeals || orderedMeals.length < 1) {
      return next(createHttpError(400, "You cannot place an empty order"));
    }
    //check availwblility of ordered products.
    //if any product is not available, send an error to the client
    if (orderedMeals && orderedMeals.length > 0) {
      orderedMeals.forEach(async (meal) => {
        const isPrdouctExists = await Meal.findById(meal.meal);
        if (!isPrdouctExists)
          return next(
            createHttpError(400, "Some products in your cart no longer exists")
          );
      });
    }
    //authenticated route

    const email = authenticatedUser.email;
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: totalAmount * 100, // Paystack amount is in kobo
        metadata: {
          meals: orderedMeals,
          deliveryInfo,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${environmentConfig.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const authorizationUrl = response.data.data.authorization_url;
    res.status(200).json(
      customResponse({
        data: authorizationUrl,
        error: false,
        message: "link sent",
        status: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const handlePaystackWebhookService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body.toString();
    const jsonData = JSON.parse(body);
    const hash = crypto
      .createHmac("sha512", environmentConfig.PAYSTACK_SECRET_KEY as string)
      .update(body, "utf-8")
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      const event = jsonData.event;

      if (event === "charge.success") {
        console.log(jsonData.data.gateway_response);
        const newOrder = new Order({
          paymentReference: jsonData.reference,
          totalAmount: jsonData.requested_amount,
          deliveryInfo: jsonData.metaData.deliveryInfo,
          userId: jsonData.metaData.userId,
          orderedMeals: jsonData.metaData.orderedMeals,
        });

        await newOrder.save();
        res.status(200).json(
          customResponse({
            data: "order placed",
            error: false,
            message: "order placed",
            status: 200,
            success: true,
          })
        );
      } else {
        // might have to handle other events as app grows
        console.log("Received Paystack event:", event);
        res.status(200).send("Event not handled");
      }
    } else {
      console.log("Invalid Paystack signature");
      //send error using the next here
      res.status(400).send("Invalid signature");
    }
  } catch (error) {
    console.log(error);
  }
};
