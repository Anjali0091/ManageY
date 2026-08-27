import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_Password,
  database: process.env.DB_NAME,
  connectionLimit: 10
});