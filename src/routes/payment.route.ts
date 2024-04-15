import express from "express";
import { verifyPaymentValidation } from "../validation/paymentValidation";
import {
  verifyPaymentController,
  createPaystackCheckoutController,
  handlePayStackWebhookController,
} from "../controllers";
import { isAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyPaymentValidation, verifyPaymentController);
router.post(
  "/create-checkout-session",
  (req, res, next) => {
    console.log("we hit here");
    next();
  },
  isAuth,
  createPaystackCheckoutController
);
router.post("/paystack/webhook", handlePayStackWebhookController);

export default router;
