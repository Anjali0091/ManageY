import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  searchProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

// CREATE
router.post(
  "/",
  authenticateToken,
  authorizeRoles("Admin"),
  createProduct
);

// GET ALL
router.get(
  "/",
  authenticateToken,
  authorizeRoles("Admin"),
  getProducts
);

// SEARCH
// IMPORTANT: this must be before /:id
router.get(
  "/search",
  authenticateToken,
  authorizeRoles("Admin"),
  searchProducts
);

// GET BY ID
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  getProductById
);

// UPDATE
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  updateProduct
);

// DELETE
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  deleteProduct
);

export default router;