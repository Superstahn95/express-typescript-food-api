import express from "express";
import {
  createCategoryValidation,
  deleteCategoryValidation,
} from "../validation/categoryValidation";
import {
  createCategoryController,
  deleteCategoryController,
} from "../controllers";

const router = express.Router();

router.post("/", createCategoryValidation, createCategoryController);
router.delete("/:id", deleteCategoryValidation, deleteCategoryController);

export default router;
