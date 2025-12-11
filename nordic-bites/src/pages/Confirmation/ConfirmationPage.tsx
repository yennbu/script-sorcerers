import React, { useEffect, useState } from "react";
import { useCartStore } from "../../components/cart/CartStore";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../../components/Order/OrderSummary";
import "./ConfirmationPage.css";

interface OrderResponse {
  orderId: string;
  success: boolean;
  message?: string;
}

const ConfirmationPage: React.FC = () => {
  const { items, total, clearCart } = useCartStore();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function confirmOrder() {
      try {
        const res = await fetch(`${API_URL}/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({ items, total }),
        });

        if (!res.ok) throw new Error(`Failed to confirm order: ${res.status}`);

        const result: OrderResponse = await res.json();
        if (result.success) {
          setOrderId(result.orderId);
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

    confirmOrder();
  }, [API_URL, API_KEY, items, total, clearCart]);

  return (
    <section className="confirmation-container">
      <h1>Order Confirmation</h1>

      {loading && <p>Bekräftar din beställning...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && orderId && (
        <>
          <p>
            Order N°: <strong>#{orderId}</strong>
          </p>
          <p>Thank you for your order!</p>

          <OrderSummary items={items} total={total} />

          <button onClick={() => navigate("/cart")}>Ändra Order</button>
          <button onClick={() => navigate("/menu")}>Avbryt Order</button>
        </>
      )}
    </section>
  );
};

export default ConfirmationPage;
