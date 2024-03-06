import express from "express";
import healthCheckRoute from "../routes/healthCheck.route";
import authRoute from "../routes/auth.route";

const router = express.Router();

router.use("/healthcheck", healthCheckRoute);
router.use("/auth", authRoute);

export default router;
