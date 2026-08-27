import { db } from "../config/database";

export const Supplier = {
    getAllSuppliers: async () => {
        const [rows] = await db.query("SELECT * FROM suppliers");
        return rows;
    },

    getById: async (id: number) => {
        const [rows] = await db.query("SELECT * FROM suppliers WHERE id = ?", [id]);
        return rows;
    },

    create: async (supplierData: string, email: string, phone: string, address: string) => {
        const [result] = await db.query(
            "INSERT INTO suppliers ( supplier_name, email, phone, address) VALUES (?, ?, ?, ?)",
            [supplierData, email, phone, address]
        );
        return result;
    },

    update: async (id: number, supplierData: string, email: string, phone: string, address: string) => {
        const [result] = await db.query(
            "UPDATE suppliers SET supplier_name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
            [supplierData, email, phone, address, id]
        );
        return result;
    },

    delete: async (id: number) => {
        const [result] = await db.query("DELETE FROM suppliers WHERE id = ?", [id]);
        return result;
    }
}