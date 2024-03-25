import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import createHttpError, { InternalServerError } from "http-errors";
import { Meal, Category } from "../models";
import { deleteFile } from "../utils";
import cloudinary from "../middlewares/file-uploads/cloudinary";
import { customResponse } from "../utils";
import { IMeal } from "../interfaces";
import { getDefaultCategory } from "./category.service";

export function consoleDirname() {
  console.log("This is my dirname...");
  console.log(__dirname);
  console.log("This is the path to an image in my public directory");
  const filePath = path.join(
    __dirname,
    "../..",
    "public",
    "upload",
    "meal",
    "mealImage-9be24450-3a34-4270-b174-4bc404b0564d.jpeg"
  );
  console.log(filePath);
  console.log("Using the resolve method in the path module");
  const ROOT_DIR = path.resolve(__dirname, "..");
  console.log(ROOT_DIR);
}

export const createMealService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(" we hit the meal service");
  const { name, description, price, categoryId } = req.body;
  try {
    let cloudinaryResult;
    if (req.file?.filename) {
      //bound to be changes in file path after typescript has been compiled to javascript
      //hence there will most likely be an issue here => look for a fix
      const localFilePath = path.join(
        __dirname,
        "../..",
        "public",
        "upload",
        "meal",
        `${req.file?.filename}`
      );
      cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
        folder: "meal",
      });
      //delete from local directory
      deleteFile(localFilePath);
      //need a function to get the default category
      const category: string | null = categoryId
        ? categoryId
        : getDefaultCategory();
      let mealData;
      if (category) {
        mealData = new Meal({
          name,
          description,
          price,
          mealImage: cloudinaryResult?.secure_url,
          cloudinary_id: cloudinaryResult?.public_id,
          category,
        });
      } else {
        mealData = new Meal({
          name,
          description,
          price,
          mealImage: cloudinaryResult?.secure_url,
          cloudinary_id: cloudinaryResult?.public_id,
        });
      }

      const meal = await mealData.save();
      // get category meal belongs to and push the meal inside
      if (meal.category) {
        const mealCategory = await Category.findById(meal.category);
        mealCategory?.meals.push(meal._id);
        await mealCategory?.save();
      }
      // try being more specific with the generic type being passed into the customResponse function

      res.status(201).json(
        customResponse({
          data: meal,
          error: false,
          success: true,
          status: 201,
          message: "Meal has been added",
        })
      );
    }
  } catch (error) {
    //delete file if something goes wrong as well;
    console.log(error);
  }
};

export const getMealsService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(
      customResponse({
        data: meals,
        error: false,
        message: "Meals fetched successfully",
        status: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    next(InternalServerError);
  }
};

export const getMealService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mealId } = req.params;
  const ObjectId = mongoose.Types.ObjectId;
  if (!ObjectId.isValid(mealId))
    return next(createHttpError(404, "meal not found"));
  try {
    const meal = await Meal.findById(mealId);
    if (!meal) {
      return next(createHttpError(404, "Meal not found"));
    }
    res.status(200).json(
      customResponse({
        data: meal,
        error: false,
        message: "Meal gotten",
        status: 200,
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    next(InternalServerError);
  }
};
