import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import createHttpError, { InternalServerError } from "http-errors";
import { Category, Meal } from "../models";
import { customResponse } from "../utils";

export const createCategoryService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, isDefault } = req.body;
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return next(
        createHttpError(400, "Category with that name already exists")
      );
    }
    if (isDefault) {
      const defaultCategory = await Category.findOne({ isDefault: true });
      if (defaultCategory) {
        //change the default field to false
        await Category.findByIdAndUpdate(
          defaultCategory._id,
          { isDefault: false },
          { new: true }
        );
      }
    }
    const newCategory = new Category({ name, isDefault });
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

export const getDefaultCategory = async (): Promise<string | null> => {
  const category = await Category.findOne({ isDefault: true });
  return category?._id;
};

export const deleteCategoryService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const ObjectId = mongoose.Types.ObjectId;
  if (ObjectId.isValid(id)) return createHttpError(404, "No category found");
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      next(createHttpError(404, "No category found"));
    }
    //get the meals and remove
    const mealsToUpdate = await Meal.find({ category: id });
    Promise.all(
      mealsToUpdate.map(async (meal) => {
        meal.category = null;
        await meal.save();
      })
    );
    res.status(200).json(
      customResponse({
        data: null,
        error: false,
        message: "meal deleted",
        status: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    next(InternalServerError);
  }
};
