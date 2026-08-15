import { Router } from "express";
import { getClients, getClientById, createClient, updateClient, deleteClient } from "../controllers/client.controller.js";
import { validateCreateClient } from "../validators/client.validator.js";
import { validate } from "../middleware/validate.middleware.js";


const router = Router();


router.get('/', getClients);
router.get('/:id', getClientById);
router.post('/', validateCreateClient, validate, createClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);



export default router;