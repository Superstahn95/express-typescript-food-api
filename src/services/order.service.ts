import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import createHttpError, { InternalServerError } from "http-errors";
import { Order, User, Meal } from "../models";
import { AuthenticatedRequestBody, IOrder } from "../interfaces";

export const createOrderService = async (
  req: AuthenticatedRequestBody<IOrder>,
  res: Response,
  next: NextFunction
) => {
  //figure out a way to get payment details attached to an order
  const { deliveryInfo, totalAmount, orderedMeals, paymentReference } =
    req.body;
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
    // replacing the below with the userID => the field can be populated if we  wish to make use of this
    // const orderOwner = {
    //   firstName: authenticatedUser.firstName,
    //   lastName: authenticatedUser.lastName,
    //   number: authenticatedUser.number,
    //   email: authenticatedUser.email,
    // };
    const order = new Order({
      totalAmount,
      orderedMeals,
      deliveryInfo,
      // orderOwner,
      userId: req.user?.id,
      paymentReference,
    });
    await order.save();
  } catch (error) {
    console.log(error);
    next(InternalServerError);
  }
};

export const getOrderService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
