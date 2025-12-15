import e, { Router } from "express";
import { validateCartBody } from "../middlewares/validators.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getProduct } from "../services/menu.js";
import { getUser } from "../services/users.js";
import { getCarts, getCart, updateCart } from "../services/cart.js";
import { v4 as uuid } from "uuid";
import { deleteCart } from "../services/cart.js";

const router = Router();

const SECRET_KEY = process.env.JWT_SECRET || "a1b1c1";
import jwt from "jsonwebtoken";

router.get("/", async (req, res, next) => {
  const carts = await getCarts();
  if (carts) {
    res.json({
      success: true,
      carts: carts,
    });
  } else {
    next({
      status: 404,
      message: "No carts found",
    });
  }
});

router.get("/:cartId", async (req, res, next) => {
  const cart = await getCart(req.params.cartId);
  if (cart) {
    let totalPrice = 0;
    cart.items.forEach((item) => {
      totalPrice += item.price * item.qty;
    });
    res.json({
      success: true,
      cart: cart,
      totalPrice: totalPrice,
    });
  } else {
    next({
      status: 404,
      message: "No cart found",
    });
  }
});

router.put("/", validateCartBody, async (req, res, next) => {
  const { prodId, qty, guestId } = req.body;
  let userId = null;
  let token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      userId = decoded.id;
    } catch (err) {
      userId = null;
    }

    console.log("userId:", userId);
  }

  const product = await getProduct(prodId);
  if (!product) {
    return next({ status: 400, message: "Invalid prodId provided" });
    // Triggas inte eftersom validateCartBody redan kollar detta
  }

  const cartOwnerId = userId || guestId || `guest-${uuid().substring(0, 5)}`;

  const result = await updateCart(cartOwnerId, {
    prodId: prodId,
    title: product.title,
    price: product.price,
    qty: qty,
  });

  const totalPrice = result.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (result) {
    res.status(201).json({
      success: true,
      message: "Cart updated",
      cart: result,
      guestId: userId ? null : cartOwnerId,
      totalPrice: totalPrice,
    });
  } else {
    next({
      status: 400,
      message: "Could not add to cart",
    });
  }
});

router.delete("/:cartId", async (req, res, next) => {
  try {
    const result = await deleteCart(req.params.cartId);
    if (result) {
      res.json({
        success: true,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No cart with id ${req.params.cartId} found`,
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: `No cart with id ${req.params.cartId} found`,
    });
  }
});

export default router;
