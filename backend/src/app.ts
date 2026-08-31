import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
// import testRoutes from "./routes/testRoutes";
import customerRoutes from "./routes/customerRoutes";
import productRoutes from "./routes/productRoutes";
import stockMovementRoutes from "./routes/stockMovementRoutes";
import supplierRoutes from "./routes/supplier.routes";
import customerFollowupRoutes from "./routes/customerFollowupRoutes";
import challanRoutes from "./routes/challanRoutes";

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/api/test", testRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/customer-followups", customerFollowupRoutes);
app.use("/api/challans", challanRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "ERP & CRM Backend API is running successfully",
    });
});

app.use("/api/auth", authRoutes);

export default app;