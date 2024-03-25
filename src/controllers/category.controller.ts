import { Request, Response, NextFunction } from "express";
import { createCategoryService, deleteCategoryService } from "../services";

export const createCategoryController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createCategoryService(req, res, next);
};

export const deleteCategoryController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  deleteCategoryService(req, res, next);
};

//other functionalities to be written when admin client side has been built
