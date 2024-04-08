import { RequestHandler } from "express";
import { categorySchema } from "./categorySchema";
import validator from "../validator";

export const createCategoryValidation: RequestHandler = (req, res, next) => {
  validator(categorySchema.createCategory, req.body, next);
};
export const deleteCategoryValidation: RequestHandler = (req, res, next) => {
  validator(
    categorySchema.deleteCategory,
    { ...req.body, ...req.params },
    next
  );
};
export const getCategoryValidation: RequestHandler = (req, res, next) => {
  validator(categorySchema.getCategory, { ...req.params }, next);
};
