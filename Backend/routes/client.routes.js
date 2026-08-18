import { Router } from "express";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/client.controller.js";
import { validateCreateClient } from "../validators/client.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.get("/",verifyJWT, getClients);
router.get("/:id",verifyJWT, getClientById);
router.post("/",verifyJWT, validateCreateClient, validate, createClient);
router.patch("/:id",verifyJWT, updateClient);
router.delete("/:id",verifyJWT, deleteClient);

export default router;
