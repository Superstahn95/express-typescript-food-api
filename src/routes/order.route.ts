import express from "express";
import { isAuth } from "../middlewares/auth";
import { placeOrderController } from "../controllers";
import { placeOrderValidation } from "../validation/orderValidation";

const router = express.Router();

router.post("/", isAuth, placeOrderController);

export default router;
