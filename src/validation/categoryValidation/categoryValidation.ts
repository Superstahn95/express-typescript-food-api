import { RequestHandler } from "express";
import { categorySchema } from "./categorySchema";
import validator from "../validator";

export const createCategoryValidation: RequestHandler = (req, res, next) => {
  validator(categorySchema.createCategory, req.body, next);
};
