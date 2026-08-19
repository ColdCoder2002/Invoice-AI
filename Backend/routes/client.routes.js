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
import authorize from "../middleware/authorize.middleware.js";

const router = Router();

router.get("/",verifyJWT, authorize("owner", "member", "viewer"), getClients);
router.get("/:id",verifyJWT, authorize("owner", "member", "viewer"), getClientById);
router.post("/",verifyJWT, authorize("owner", "member"), validateCreateClient, validate, createClient);
router.patch("/:id", verifyJWT, authorize("owner"), updateClient);
router.delete("/:id", verifyJWT, authorize("owner"), deleteClient);

export default router;
