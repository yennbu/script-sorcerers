import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  prodId: String,
  title: String,
  price: Number,
  qty: Number,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    orderNumber: { type: Number },
    userId: { type: String, required: true },
    items: [orderItemSchema],
    price: { type: Number, required: true },
    note: { type: String },
    enum: ["pending", "confirmed", "cancelled", "done"],
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
