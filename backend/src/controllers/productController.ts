import { Request, Response } from "express";
import { db } from "../config/database";

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      product_name,
      sku,
      category,
      unit_price,
      current_stock,
      minimum_stock,
      warehouse_location,
    } = req.body;

    const sql = `
      INSERT INTO products
      (
        product_name,
        sku,
        category,
        unit_price,
        current_stock,
        minimum_stock,
        warehouse_location
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result]: any = await db.query(sql, [
      product_name,
      sku,
      category,
      unit_price,
      current_stock,
      minimum_stock,
      warehouse_location,
    ]);

    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: "Failed to create product",
      error,
    });
  }
};

// =========================
// GET ALL PRODUCTS
// =========================
export const getProducts = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

// =========================
// GET PRODUCT BY ID
// =========================
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [rows]: any = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Get product by ID error:", error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

// =========================
// SEARCH PRODUCTS
// =========================
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const search = String(req.query.name || "").trim();

    if (!search) {
      return res.status(400).json({
        message: "Please provide a product name",
      });
    }

    const searchValue = `%${search}%`;

    const [rows]: any = await db.query(
      `SELECT * FROM products
       WHERE product_name LIKE ?
       OR sku LIKE ?
       OR category LIKE ?
       ORDER BY id DESC`,
      [searchValue, searchValue, searchValue]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Search product error:", error);

    res.status(500).json({
      message: "Failed to search products",
      error,
    });
  }
};

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      product_name,
      sku,
      category,
      unit_price,
      current_stock,
      minimum_stock,
      warehouse_location,
    } = req.body;

    const [result]: any = await db.query(
      `UPDATE products
       SET product_name = ?,
           sku = ?,
           category = ?,
           unit_price = ?,
           current_stock = ?,
           minimum_stock = ?,
           warehouse_location = ?
       WHERE id = ?`,
      [
        product_name,
        sku,
        category,
        unit_price,
        current_stock,
        minimum_stock,
        warehouse_location,
        id,
      ]
    );

    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result]: any = await db.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};