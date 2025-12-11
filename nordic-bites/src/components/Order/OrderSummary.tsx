import React from "react";
import type { CartItem } from "../cart/CartStore";
import "./OrderSummary.css";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  return (
    <div className="order-summary">
      {items.map((item) => (
        <div key={item.id} className="order-summary__item">
          <p>
            {item.name} x {item.quantity}
          </p>
          <p>{item.price * item.quantity} kr</p>
        </div>
      ))}
      <p className="order-summary__total">Total: {total} kr</p>
    </div>
  );
};

export default OrderSummary;
