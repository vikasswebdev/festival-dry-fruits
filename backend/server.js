import express from "express";
import path from "path";
import cors from "cors";
import products from "../backend/data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("api is running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
