import express, { Request, Response } from "express";
import {
  loginValidation,
  signUpValidation,
} from "../validation/authValidation";
import { loginController, signUpController } from "../controllers";

const router = express.Router();

// router.get("/", (req: Request, res: Response) => {
//   res.send("Auth route up and functional");
// });

router.post("/register", signUpValidation, signUpController);

router.post("/login", loginValidation, loginController);

export default router;
