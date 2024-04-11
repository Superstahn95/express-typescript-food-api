import express from "express";
import healthCheckRoute from "../routes/healthCheck.route";
import authRoute from "../routes/auth.route";
import mealRoute from "../routes/meal.route";
import categoryRoute from "../routes/category.route";
import paymentRoute from "../routes/payment.route";
const router = express.Router();

router.use("/healthcheck", healthCheckRoute);
router.use("/auth", authRoute);
router.use("/meal", mealRoute);
router.use("/category", categoryRoute);
router.use("/payment", paymentRoute);

export default router;
