import { Request, Response } from 'express';
import { db } from '../config/database';

export const getAllChallans = async (req: Request, res: Response) => {
    try {
        const [results] = await db.query("SELECT * FROM challans");
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching challans:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const getChallanById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [results]: any = await db.query("SELECT * FROM challans WHERE id = ?", [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: "Challan not found" });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        console.error("Error fetching challan:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const createChallan = async (req: Request, res: Response) => {
    try {
        const { challan_number, customer_id, challan_date, status, remarks, created_by } = req.body;
        const [result]: any = await db.query(
            "INSERT INTO challans (challan_number, customer_id, challan_date, status, remarks, created_by) VALUES (?, ?, ?, ?, ?, ?)",
            [challan_number, customer_id, challan_date, status, remarks, created_by]
        );
        res.status(201).json({ id: result.insertId, challan_number, customer_id, challan_date, status, remarks, created_by });
    } catch (err) {
        console.error("Error creating challan:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const updateChallan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { challan_number, customer_id, challan_date, status, remarks } = req.body;
        await db.query(
            "UPDATE challans SET challan_number = ?, customer_id = ?, challan_date = ?, status = ?, remarks = ? WHERE id = ?",
            [challan_number, customer_id, challan_date, status, remarks, id]
        );
        res.status(200).json({ message: "Challan updated successfully" });
    } catch (err) {
        console.error("Error updating challan:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

export const deleteChallan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM challans WHERE id = ?", [id]);
        res.status(200).json({ message: "Challan deleted successfully" });
    } catch (err) {
        console.error("Error deleting challan:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
};