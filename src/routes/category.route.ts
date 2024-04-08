import express from "express";
import {
  createCategoryValidation,
  deleteCategoryValidation,
  getCategoryValidation,
} from "../validation/categoryValidation";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryController,
} from "../controllers";

const router = express.Router();

router.post("/", createCategoryValidation, createCategoryController);
router.delete("/:id", deleteCategoryValidation, deleteCategoryController);
//get route to fecth all categories and populate the meals field
router.get("/", getCategoriesController);

router.get("/:categoryId", getCategoryValidation, getCategoryController);

export default router;
