import { Request, Response } from "express";
import { db } from "../config/database";

// Create stock movement
export const createStockMovement = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity, movement_type, reason, created_by } = req.body;
    if(!product_id || !quantity || quantity <=0 || !movement_type) {
        return res.status(400).json({
            message: "Invalid stock movement data"
        });
    }

    if (!product_id || !quantity || !movement_type || !reason || !created_by) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (movement_type !== "IN" && movement_type !== "OUT") {
      return res.status(400).json({
        message: "movement_type must be IN or OUT",
      });
    }

    const [result]: any = await db.execute(
      `INSERT INTO stock_movements
      (product_id, quantity, movement_type, reason, created_by)
      VALUES (?, ?, ?, ?, ?)`,
      [product_id, quantity, movement_type, reason, created_by]
    );

    // Update product stock
    if (movement_type === "IN") {
      await db.execute(
        `UPDATE products
         SET current_stock = current_stock + ?
         WHERE id = ?`,
        [quantity, product_id]
      );
    } else {
      await db.execute(
        `UPDATE products
         SET current_stock = current_stock - ?
         WHERE id = ?`,
        [quantity, product_id]
      );
    }

    res.status(201).json({
      message: "Stock movement created successfully",
      id: result.insertId,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create stock movement",
      error: error.message,
    });
  }
};

// Get all stock movements
export const getStockMovements = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.execute(`
      SELECT *
      FROM stock_movements
      ORDER BY id DESC
    `);

    res.status(200).json(rows);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch stock movements",
      error: error.message,
    });
  }
};

// Get stock movement by ID
export const getStockMovementById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const [rows]: any = await db.execute(
      `SELECT * FROM stock_movements WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Stock movement not found",
      });
    }

    res.status(200).json(rows[0]);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch stock movement",
      error: error.message,
    });
  }
};


export const updateStockMovement = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { quantity, movement_type } = req.body;

    const sql = `
      UPDATE stock_movements
      SET quantity = ?, movement_type = ?
      WHERE id = ?
    `;

    await db.query(sql, [quantity, movement_type, id]);

    return res.status(200).json({
      message: "Stock movement updated successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update stock movement"
    });
  }
};


export const deleteStockMovement = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM stock_movements WHERE id = ?";

    await db.query(sql, [id]);

    return res.status(200).json({
      message: "Stock movement deleted successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete stock movement"
    });
  }
};