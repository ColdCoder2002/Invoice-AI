import { Router } from "express";
import { registerUser, loginUser,logoutUser } from "../controllers/auth.controller.js";
import { validateRegister } from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";



const router = Router();




router.post("/register", validateRegister, validate, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);





export default router