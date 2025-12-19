import { Router } from "express";
import { v4 as uuid } from "uuid";
import Order from "../models/Order.js";
import { validateApiKey } from "../middlewares/validateApiKey.js";
import { validateOrderBody } from "../middlewares/validators.js";
import { authorizeUser } from "../middlewares/adminAuth.js";
import { deleteCart, getCart } from "../services/cart.js";
import {
  createOrder,
  getOrders,
  getOrdersByUserId,
} from "../services/orders.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const orders = await getOrders();
  if (orders) {
    res.json({
      success: true,
      orders: orders,
    });
  } else {
    next({
      success: 404,
      message: "No orders found",
    });
  }
});

router.get("/:userId", async (req, res, next) => {
  const orders = await getOrdersByUserId(req.params.userId);
  if (orders) {
    res.json({
      success: true,
      orders: orders,
    });
  } else {
    next({
      success: 404,
      message: "No orders found",
    });
  }
});

router.get("/by-id/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (order) {
      res.json({ success: true, order });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (err) {
    next({ success: false, message: "Internal server error" });
  }
});

router.post("/", validateApiKey, validateOrderBody, async (req, res, next) => {
  const lastOrder = await Order.findOne().sort({ createdAt: -1 });
  const orderNumber = lastOrder ? (lastOrder.orderNumber || 0) + 1 : 1;
  const { cartId, note } = req.body;
  const cart = await getCart(cartId);
  if (cart) {
    let price = 0;
    cart.items.forEach((item) => (price += item.qty * item.price));

    const order = await createOrder({
      orderId: `order-${uuid().substring(0, 5)}`,
      orderNumber,
      userId: cartId,
      items: cart.items,
      price: price,
      note: note,
      status: "pending",
    });
    if (order) {
      const result = await deleteCart(cartId);
      if (result) {
        res.status(201).json({
          success: true,
          message: "Order created successfully",
          order: order,
        });
      } else {
        next({
          success: 400,
          message: "Order could not be created",
        });
      }
    } else {
      next({
        success: 400,
        message: "Order could not be created",
      });
    }
  } else {
    next({
      success: 400,
      message: "The requested cart does not exist",
    });
  }
});

router.put("/:orderId/status", verifyToken, authorizeUser("admin"), validateApiKey, async (req, res, next) => {
  const { status } = req.body;
  const { orderId } = req.params;

  const allowed = ["confirmed", "cancelled", "done"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({ message: "Cancelled orders cannot be updated" });
    }

    if (order.status === "done") {
      return res.status(400).json({ message: "Done orders cannot be updated" });
    }

    if (status === "done" && order.status !== "confirmed") {
      return res.status(400).json({ message: "Order must be confirmed first" });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
});


export default router;
