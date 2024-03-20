import { Request, Response, NextFunction } from "express";
import { createCategoryService } from "../services";

export const createCategoryController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createCategoryService(req, res, next);
};

//other functionalities to be written when admin client side has been built
