import express from "express";
import { verifyPaymentValidation } from "../validation/paymentValidation";
import { verifyPaymentController } from "../controllers";

const router = express.Router();

router.post("/", verifyPaymentValidation, verifyPaymentController);

export default router;
