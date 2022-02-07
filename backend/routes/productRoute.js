import express from "express";

import {
  createProduct,
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//get all products
router.route("/").get(getProducts).post(protect, admin, createProduct);

//get single product by id
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
