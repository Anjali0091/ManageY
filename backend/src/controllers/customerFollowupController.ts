import { Request, Response } from "express";
import { db } from "../config/database";

export const getCustomerFollowups = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query(`SELECT* FROM customers_followups ORDER BY id DESC`);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to fetch customer follow-ups"});
    }
};

export const getCustomerFollowupsByCustomer = async (
    req: Request,
    res: Response
) => {
    try {
        const customerId = req.params.customerId;

        const[rows]= await db.query(
            `SELECT * FROM customers_followups WHERE customer_id = ? ORDER BY follow_up_date DESC`, [customerId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to fetch customer follow-ups"});
    }
};

export const createCustomerFollowup = async (
    req: Request,
    res: Response
) => {
    try {
        console.log("Request body:", req.body);
        const { customer_id, follow_up_date, notes, created_by} = req.body;
        if (
            customer_id === undefined ||
            follow_up_date === undefined ||
            notes === undefined ||
            created_by === undefined
            ) {
            return res.status(400).json({
                message:
                "customer_id, follow_up_date, notes and created_by are required",
            });
        }
        const [result]: any = await db.query (
            `INSERT INTO customers_followups (customer_id, follow_up_date, notes, created_by) VALUES(?,?,?,?)`, [customer_id, follow_up_date, notes, created_by]
        );
        res.status(201).json({
            message: "Customer follow-up created successfully", id: result.insertId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to create customer follow-up"});
    }
};

export const updateCustomerFollowup = async (
    req: Request,
    res: Response
) => {
    try {
        const id= req.params.id;

        const {
            customer_id,
            follow_up_date, notes, created_by,
        } = req.body;

        if (
            customer_id === undefined || follow_up_date === undefined || notes
            === undefined || created_by === undefined
        ) {
            return res.status(400).json({message: "customer_id, follow_up_date, notes and created_by are required",});
        }
        const [result]: any = await db.query(
            `UPDATE customers_followups SET customer_id = ?, follow_up_date = ?, notes = ?, created_by = ? WHERE id = ?`, [customer_id, follow_up_date, notes, created_by, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Customer follow-up not found"});
        }
        res.status(200).json({message: "Customer follow-up updated successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to update customer follow-up"}); 
    }
}