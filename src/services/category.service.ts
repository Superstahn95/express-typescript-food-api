import { Request, Response, NextFunction } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import { Category } from "../models";
import { customResponse } from "../utils";

export const createCategoryService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return next(
        createHttpError(400, "Category with that name already exists")
      );
    }
    const newCategory = new Category({ name });
    //we shouldn't have duplicate categories
    const category = await newCategory.save();
    res.status(201).json(
      customResponse({
        data: category,
        error: false,
        message: "category added",
        status: 201,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    next(InternalServerError);
  }
};
