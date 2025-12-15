import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import OrderSummary from "../../components/Order/OrderSummary";
import logo from "../../../public/images/Logo.png";
import "./ConfirmationPage.css";

interface Order {
  orderId: string;
  orderNumber?: number;
  items: {
    prodId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  price: number;
  note?: string;
}

const ConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  let orderId = searchParams.get("orderId");
  orderId = "order-232d4";
  useEffect(() => {
    if (!orderId) {
      setError("Ingen order hittades.");
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to load order: ${res.status}`);
        }

        const result = await res.json();

        if (result.success) {
          setOrder(result.order);
        } else {
          setError(result.message || "Order fetch failed");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId, API_URL, API_KEY]);

  return (
    <section className="confirmation-container">
      <div className="cart-header">
        <img src={logo} alt="Nordic Bites logo" className="Cart-logo" />
        <h1 className="title">Nordic Bites</h1>
      </div>
      <h2 className="Subtitle">Orderbekräftelse</h2>

      {loading && <p>Hämtar din order...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && order && (
        <>
          <p>
            Order N°: <strong>{order.orderNumber ?? order.orderId}</strong>
          </p>

          <p>Tack för din beställning.</p>

          <OrderSummary items={order.items} total={order.price} />

          <div className="confirmation-buttons">
            <button onClick={() => navigate("/menu")}>
              Tillbaka till menyn
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ConfirmationPage;
