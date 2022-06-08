import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  paymentController,
  updateOrderStatus,
  updateOrderToDelivered,
  updateOrderToPaid,
  verifyPayment,
} from "../controllers/orderController.js";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, admin, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

router.route("/:id/status").put(protect, admin, updateOrderStatus);

router.route("/payment").post(protect, paymentController);

router.route("/payment/verify").post(protect, verifyPayment);

export default router;
