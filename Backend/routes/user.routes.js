import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import validateRegister from "../middleware/validate.middleware.js";


const router = Router();


//* POST /api/v1/users/register
router.post('/register', validateRegister, registerUser);


export default router;