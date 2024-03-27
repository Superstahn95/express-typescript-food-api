import express from "express";
import {
  createCategoryValidation,
  deleteCategoryValidation,
} from "../validation/categoryValidation";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
} from "../controllers";

const router = express.Router();

router.post("/", createCategoryValidation, createCategoryController);
router.delete("/:id", deleteCategoryValidation, deleteCategoryController);
//get route to fecth all categories and populate the meals field
router.get("/", getCategoriesController);

export default router;
