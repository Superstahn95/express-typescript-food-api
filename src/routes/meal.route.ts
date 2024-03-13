import express from "express";
import { createMealValidation } from "../validation/mealValidation";

const router = express.Router();

//create a controller and a service for handling meal creation
router.post("/meal", createMealValidation);
