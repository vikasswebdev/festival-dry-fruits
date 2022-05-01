import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await Order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

export const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });
  res.json(order);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

// @desc payment controller
// @route GET /api/orders/payment
// @access Private

export const paymentController = asyncHandler(async (req, res) => {
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
});

// @desc    Verify payment
// @route   POST /api/orders/verify
// @access  Private

export const verifyPayment = asyncHandler(async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
      orderId,
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    console.log(req.body);

    const shasum = crypto.createHmac("sha256", "AkpG1obYFH0bnHGLUjnh4VTC");

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const generatedSignature = shasum.digest("hex");

    if (generatedSignature !== razorpaySignature) {
      res.status(400).json({
        message: "Payment failed",
      });
      return;
    } else {
      const instance = new Razorpay({
        key_id: "rzp_test_DvRUfbzys6ZwsX",
        key_secret: "AkpG1obYFH0bnHGLUjnh4VTC",
      });

      const order = await Order.findById(orderId).populate(
        "user",
        "name email"
      );

      // console.log("order", order);

      const verify = await instance.orders.fetch(razorpayOrderId);

      // console.log("verify", verify);

      if (!verify) {
        res.status(500).json({
          message: "Some error occured",
        });
        return;
      }

      if (verify.status === "paid") {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: razorpayPaymentId,
          status: verify.status,
          update_time: verify.update_time,
          email_address: verify.email_address,
        };
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(400).json({
          message: "Payment failed",
        });
        return;
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
