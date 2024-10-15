import express, { Request, Response } from "express";
import {
  loginValidation,
  signUpValidation,
} from "../validation/authValidation";
import {
  loginController,
  refeshTokenController,
  signUpController,
  logoutController,
  refetchUserController,
  mobileLoginController,
  mobileSignUpController,
} from "../controllers";
import { isAuth, refreshTokenCheck } from "../middlewares/auth";

const router = express.Router();

// router.get("/", (req: Request, res: Response) => {
//   res.send("Auth route up and functional");
// });

router.post("/register", signUpValidation, signUpController);
router.post("/mobile/register", signUpValidation, mobileSignUpController);
router.post("/login", loginValidation, loginController);
router.post("/mobile/login", loginValidation, mobileLoginController);
router.post("/logout", isAuth, logoutController);

//should have an auth middleware
router.post("/refresh-token", refreshTokenCheck, refeshTokenController);

//test route to check protected routes through out our application
router.get("/protected", isAuth, (req, res, next) => {
  res.status(200).json({
    message: "Hey!!! authenticated user, You can access this route now!!",
  });
});

//refetch user on refresh
router.get("/refetch", refetchUserController);

export default router;
