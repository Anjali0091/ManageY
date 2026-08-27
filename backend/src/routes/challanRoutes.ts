import { Router } from "express";
import { getAllChallans, getChallanById, createChallan, updateChallan, deleteChallan } from "../controllers/challanController";

const router = Router();

router.get("/", getAllChallans);
router.get("/:id", getChallanById);
router.post("/", createChallan);
router.put("/:id", updateChallan);
router.delete("/:id", deleteChallan);

export default router;