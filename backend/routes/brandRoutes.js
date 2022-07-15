import express from "express";
import { addBrand } from "../controllers/brandController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/add").post(protect, admin, addBrand);

export default router;
