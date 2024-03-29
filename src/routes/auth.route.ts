import express, { Request, Response } from "express";
import {
  loginValidation,
  signUpValidation,
} from "../validation/authValidation";
import {
  loginController,
  refeshTokenController,
  signUpController,
} from "../controllers";
import { isAuth, refreshTokenCheck } from "../middlewares/auth";

const router = express.Router();

// router.get("/", (req: Request, res: Response) => {
//   res.send("Auth route up and functional");
// });

router.post("/register", signUpValidation, signUpController);

router.post("/login", loginValidation, loginController);

//should have an auth middleware
router.post("/refresh-token", refreshTokenCheck, refeshTokenController);

//test route to check protected routes through out our application
router.get("/protected", isAuth, (req, res, next) => {
  res.status(200).json({
    message: "Hey!!! authenticated user, You can access this route now!!",
  });
});

export default router;
