import express from "express";
import { createCategoryValidation } from "../validation/categoryValidation";
import { createCategoryController } from "../controllers";

const router = express.Router();

router.post("/", createCategoryValidation, createCategoryController);

export default router;
