import { Router } from "express";
import { getCustomerFollowups, getCustomerFollowupsByCustomer, createCustomerFollowup, updateCustomerFollowup } from "../controllers/customerFollowupController";

const router = Router();

router.get("/", getCustomerFollowups);

router.get("/customer/:customerId", getCustomerFollowupsByCustomer);

getCustomerFollowupsByCustomer;

router.post("/", createCustomerFollowup);

router.put("/:id", updateCustomerFollowup);

export default router;