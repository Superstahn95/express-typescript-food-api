import { RequestHandler } from "express";
import validator from "../validator";
import { orderSchema } from "./orderSchema";

export const placeOrderValidation: RequestHandler = (req, res, next) => {
  validator(orderSchema.placeOrder, { ...req.body }, next);
};


// import { RequestHandler } from "express";
// import validator from "../validator";
// import { mealSchema } from "./mealSchema";

// // const validator: (schema: Joi.ObjectSchema, body: Object, next: NextFunction) => void

// export const createMealValidation: RequestHandler = (req, res, next) => {
//   console.log("we hit the validator");
//   // i will be needing to spread the req.file here
//   validator(mealSchema.createMeal, { ...req.body, ...req.file }, next);
// };

// export const getMealValidation: RequestHandler = (req, res, next) => {
//   //properly validate the id to make sure it is an object type of id
//   validator(mealSchema.getMeal, { ...req.params }, next);
// };