import express from "express";
import {
  createMealValidation,
  getMealValidation,
} from "../validation/mealValidation";
import {
  createMealController,
  getMealsController,
  getMealController,
} from "../controllers";
import { uploadImage } from "../middlewares/file-uploads";

const router = express.Router();

//create a controller and a service for handling meal creation
router.post(
  "/",
  uploadImage.single("mealImage"),
  createMealValidation,
  createMealController
);

//get all meals
router.get("/", getMealsController);

//get a meal
router.get("/:mealId", getMealValidation, getMealController);

export default router;
