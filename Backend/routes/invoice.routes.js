import { Router } from "express"
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
} from "../controllers/invoice.controller.js"
import  verifyJWT  from "../middleware/auth.middleware.js"
import  authorize  from "../middleware/authorize.middleware.js"

const router = Router()

router.get("/", verifyJWT, authorize("owner", "member", "viewer"), getInvoices)
router.get("/:id", verifyJWT, authorize("owner", "member", "viewer"), getInvoiceById)
router.post("/", verifyJWT, authorize("owner", "member"), createInvoice)
router.patch("/:id", verifyJWT, authorize("owner", "member"), updateInvoice)
router.delete("/:id", verifyJWT, authorize("owner"), deleteInvoice)

export default router