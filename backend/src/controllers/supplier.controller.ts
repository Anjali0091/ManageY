import { Request, Response } from "express";
import { Supplier } from "../models/supplier.model";

export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers" });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid supplier ID" });
    }

    const supplier = await Supplier.getById(id);

    if ((supplier as any[]).length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json((supplier as any[])[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching supplier" });
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const { supplier_name, email, phone, address } = req.body;

    if (!supplier_name) {
      return res.status(400).json({
        message: "Supplier name is required"
      });
    }

    const result = await Supplier.create(
      supplier_name,
      email,
      phone,
      address
    );

    res.status(201).json({
      message: "Supplier created successfully",
      result
    });
  } catch (error) {
    console.error("error creating supplier:", error);
    res.status(500).json({ message: "Error creating supplier" });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { supplier_name, email, phone, address } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Invalid supplier ID" });
    }

    if (!supplier_name) {
      return res.status(400).json({
        message: "Supplier name is required"
      });
    }

    const result = await Supplier.update(
      id,
      supplier_name,
      email,
      phone,
      address
    );

    res.status(200).json({
      message: "Supplier updated successfully",
      result
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating supplier" });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid supplier ID" });
    }

    const result = await Supplier.delete(id);

    res.status(200).json({
      message: "Supplier deleted successfully",
      result
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting supplier" });
  }
};