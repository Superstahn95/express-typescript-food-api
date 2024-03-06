import express from "express";
import healthCheckRoute from "../routes/healthCheckRoute";

const router = express.Router();

router.use("/healthcheck", healthCheckRoute);

export default router;
