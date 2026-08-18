import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validateRegister, validate, registerUser);
router.post("/login", validateLogin, validate, loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
