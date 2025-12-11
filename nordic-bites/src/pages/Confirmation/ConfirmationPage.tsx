import React, { useEffect, useState } from "react";
import { useCartStore } from "../../components/cart/CartStore";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../../components/order/OrderSummary";
import "./ConfirmationPage.css";

interface Order {
  orderId: string;
  orderNumber?: number;
  items: { name: string; quantity: number; price: number }[];
  price: number;
  note?: string;
}

const ConfirmationPage: React.FC = () => {
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function createOrder() {
      try {
        const res = await fetch(`${API_URL}/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            cartId: "user123",
            note: "",
          }),
        });

        if (!res.ok) throw new Error(`Failed to confirm order: ${res.status}`);

        const result = await res.json();
        if (result.success) {
          setOrder(result.order);
          clearCart();
        } else {
          setError(result.message || "Order confirmation failed");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    createOrder();
  }, [API_URL, API_KEY, items, total, clearCart]);

  return (
    <section className="confirmation-container">
      <h1>Order Confirmation</h1>

      {loading && <p>Bekräftar din beställning...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && order && (
        <>
          <p>
            Order N°: <strong>{order.orderNumber ?? order.orderId}</strong>
          </p>
          <p>Thank you for your order!</p>
          <OrderSummary items={items} total={total} />
          <div className="confirmation-buttons">
            <button onClick={() => navigate("/cart")}>Ändra Order</button>
            <button onClick={() => navigate("/menu")}>Avbryt Order</button>
          </div>
        </>
      )}
    </section>
  );
};

export default ConfirmationPage;
