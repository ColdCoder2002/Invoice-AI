import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware.js";
import clientRoutes from "./routes/client.routes.js";
import authRoutes from "./routes/auth.routes.js";
import invoiceRouter from "./routes/invoice.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/invoices", invoiceRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(errorMiddleware);

export { app };
