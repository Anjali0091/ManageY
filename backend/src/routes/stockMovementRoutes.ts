import { Router } from "express";
import {
  createStockMovement, getStockMovements, getStockMovementById, updateStockMovement, deleteStockMovement } from "../controllers/stockMovementController";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles("Admin"),
  getStockMovements
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  getStockMovementById
);

router.post(
  "/",
  authenticateToken,
  authorizeRoles("Admin"),
  createStockMovement
);

router.put (
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  updateStockMovement
)

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  deleteStockMovement
)

export default router;