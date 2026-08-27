import { Router, Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/admin",
  authenticateToken,
  authorizeRoles("Admin"),
  (req: AuthRequest, res: Response) => {
    res.json({
      message: "Admin protected route working successfully",
      user: req.user
    });
  }
);

export default router;