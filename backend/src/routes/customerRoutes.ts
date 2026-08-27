import { Router } from "express";
import { createCustomer, updateCustomer, searchCustomers } from "../controllers/customerController";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { db } from "../config/database";
import { deleteCustomer } from "../controllers/customerController";
import { getCustomer, getCustomerById } from "../controllers/customerController";

const router = Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("Admin"),
  createCustomer
);

router.get(
  "/",
  authenticateToken,
  authorizeRoles("Admin"), 
  async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM customers");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch customers" });
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  getCustomer
);

router.get(
  "/search",
  authenticateToken,
  authorizeRoles("Admin"),
  searchCustomers
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  getCustomerById
)

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  updateCustomer
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  deleteCustomer
);

export default router;
