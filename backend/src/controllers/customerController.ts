import { Request, Response } from "express";
import { db } from "../config/database";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const {
      customer_name,
      mobile,
      email,
      business_name,
      gst_number,
      customer_type,
      address,
      status,
      follow_up_date,
      notes
    } = req.body;

    if (!customer_name || !mobile) {
      return res.status(400).json({
        message: "Customer name and mobile are required"
      });
    }

    const [result] = await db.execute(
      `INSERT INTO customers
      (customer_name, mobile, email, business_name, gst_number,
       customer_type, address, status, follow_up_date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_name,
        mobile,
        email || null,
        business_name || null,
        gst_number || null,
        customer_type || null,
        address || null,
        status || "Active",
        follow_up_date || null,
        notes || null
      ]
    );

    res.status(201).json({
      message: "Customer created successfully",
      customer: result
    });

  } catch (error) {
    console.error("Create customer error:", error);

    res.status(500).json({
      message: "Failed to create customer"
    });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      customer_name,
      mobile,
      email,
      business_name,
      gst_number,
      customer_type,
      address,
      status,
      follow_up_date,
      notes
    } = req.body;

    const [result]: any = await db.execute(
      `UPDATE customers
       SET customer_name = ?,
           mobile = ?,
           email = ?,
           business_name = ?,
           gst_number = ?,
           customer_type = ?,
           address = ?,
           status = ?,
           follow_up_date = ?,
           notes = ?
       WHERE id = ?`,
      [
        customer_name,
        mobile,
        email || null,
        business_name || null,
        gst_number || null,
        customer_type,
        address || null,
        status || "Active",
        follow_up_date || null,
        notes || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer updated successfully"
    });

  } catch (error) {
    console.error("Update customer error:", error);

    res.status(500).json({
      message: "Failed to update customer"
    });
  }
};

export const searchCustomers = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;

    if (!search) {
      return res.status(400).json({
        message: "Search value is required"
      });
    }

    const [rows]: any = await db.execute(
      `SELECT * FROM customers
       WHERE customer_name LIKE ?
          OR mobile LIKE ?
          OR email LIKE ?
          OR business_name LIKE ?`,
      [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      ]
    );

    if(rows.length === 0) {
      return res.status(404).json({
        message: "No customers found"
      });
    }

    res.status(200).json(rows);

  } catch (error) {
    console.error("Search customers error:", error);

    res.status(500).json({
      message: "Failed to search customers"
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result]: any = await db.query(
      "DELETE FROM customers WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully"
    });
  } catch (error) {
    console.error("Delete customer error:", error);

    res.status(500).json({
      message: "Failed to delete customer"
    });
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM customers ORDER BY id DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch customers"
    });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows]: any = await db.query(
      "SELECT * FROM customers WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch customer"
    });
  }
};
