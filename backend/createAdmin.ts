import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { db } from "./src/config/database";

dotenv.config();

async function createAdmin() {
    try {
        const name = "Admin";
        const email = "admin@gmail.com";
        const password = "admin123";
        const hashedPassword = await bcrypt.hash(password, 10);

        const [roles]: any = await db.query(
            `SELECT id FROM roles WHERE name = ?`,
            ["Admin"]
        );

        if (roles.length === 0) {
            console.error("Admin role not found in the database.");
            process.exit(1);
        }

        const roleId = roles[0].id;

        await db.query(
            `INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, roleId]
        );

        console.log("Admin user created successfully.");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin user:", error);
        process.exit(1);
    }
}

createAdmin();