import express from "express";
import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";
import crypto from "crypto";
import { protect, admin } from "../middleware/authMiddleware.js";
import Order from "../models/orderModel.js";

const router = express.Router();

router.post(
  "/orders",
  asyncHandler(async (req, res) => {
    try {
      const { id } = req.body;

      const instance = new Razorpay({
        key_id: "rzp_test_DvRUfbzys6ZwsX",
        key_secret: "AkpG1obYFH0bnHGLUjnh4VTC",
      });

      const order = await Order.findById(id).populate("user", "name email");

      const options = {
        amount: order.totalPrice,
        currency: "INR",
        receipt: order._id,
      };

      const myorder = await instance.orders.create(options);

      if (!myorder) {
        res.status(500).send("Some error occured");
        return;
      }
      res.json(myorder);
    } catch (error) {
      res.status(500).send(error);
    }
  })
);

export default router;
