import { RequestHandler } from "express";
import validator from "../validator";
import { mealSchema } from "./mealSchema";

// const validator: (schema: Joi.ObjectSchema, body: Object, next: NextFunction) => void

export const createMealValidation: RequestHandler = (req, res, next) => {
  validator(mealSchema.createMeal, req.body, next);
};
