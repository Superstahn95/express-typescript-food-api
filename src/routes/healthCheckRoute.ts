import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const message =
    "Welcome to my food api for my express and typescript build  - 👋🌎🌍🌏 - health check confirm!!";
  res.send(message);
});

export default router;
