import { Router } from "express";
import {
   getAllSuppliers,
   getSupplierById,
   createSupplier,
    updateSupplier,
    deleteSupplier
} from "../controllers/supplier.controller";

const router = Router();

router.get("/", getAllSuppliers);
router.get("/:id", getSupplierById);
router.post("/", createSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;