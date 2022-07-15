import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";

dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();
// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }

app.use(express.json());
app.use(cors());
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/brands", brandRoutes);
// app.use("/api/payment", paymentRoutes);
app.use(notFound);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("api is running");
});

const PORT = 5001;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
