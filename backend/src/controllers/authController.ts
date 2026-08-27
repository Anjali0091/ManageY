import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/database";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const [rows]: any = await db.query(
      `SELECT users.id, users.name, users.email, users.password,
              roles.name AS role
       FROM users
       JOIN roles ON users.role_id = roles.id
       WHERE users.email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = rows[0];

     

    const passwordMatch = await bcrypt.compare(password, user.password);

    
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d"
      }
    );

     

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};