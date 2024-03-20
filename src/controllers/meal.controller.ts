import { Request, Response, NextFunction } from "express";
import {
  createMealService,
  getMealsService,
  getMealService,
} from "../services";

export const createMealController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("we hit the controller");
  createMealService(req, res, next);
};

export const getMealsController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getMealsService(req, res, next);
};

export const getMealController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Controller to get a single meal has been hit");
  getMealService(req, res, next);
};

//subsequently make controllers and services to delete and update meals when ready to make an admin side
