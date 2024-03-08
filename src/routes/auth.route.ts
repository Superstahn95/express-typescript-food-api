import express, { Request, Response } from "express";
import {
  loginValidation,
  signUpValidation,
} from "../validation/authValidation";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Auth route up and functional");
});

router.post("/register", signUpValidation);

router.post("/login", loginValidation);

export default router;
