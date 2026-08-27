import dotenv from "dotenv";
import app from "./app";
import {db} from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        const connection = await db.getConnection();

        console.log("Database connect successfully");
        connection.release();

        app.listen(Number(PORT), "0.0.0.0", () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

startServer();