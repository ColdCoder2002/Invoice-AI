import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { validateRegister } from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";



const router = Router();


router.post("/register", validateRegister, validate, registerUser)

export default router