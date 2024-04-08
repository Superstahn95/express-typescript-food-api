import { Request, Response, NextFunction } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  getCategoryService,
} from "../services";

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

export const getCategoriesController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getCategoriesService(req, res, next);
};

export const getCategoryController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getCategoryService(req, res, next);
};

//other functionalities to be written when admin client side has been built
