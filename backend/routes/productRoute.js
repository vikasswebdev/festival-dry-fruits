import express from "express";

import {
  createProduct,
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProductReview,
  topProductsList,
  getProductsForDashboard,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//get all products
router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id/reviews").post(protect, createProductReview);

router.route("/top").get(topProductsList);

//get single product by id
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

// get all products for admin dashboard
router.route("/admin/productlist").get(protect, admin, getProductsForDashboard);

export default router;
