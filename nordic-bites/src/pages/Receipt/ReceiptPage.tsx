import { useEffect, useState } from "react";
import "../../styles/ReceiptPage.css";

import logo from "/images/Logo.png";
import mountains from "/images/mountains.jpg";

type ReceiptOrderItem = {
  prodId: string;
  title: string;
  price: number;
  qty: number;
};

type ReceiptOrder = {
  orderId: string;
  items: ReceiptOrderItem[];
  price: number;
  note?: string;
};

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const ReceiptPage: React.FC = () => {
  const [order, setOrder] = useState<ReceiptOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      if (!API_URL || !API_KEY) {
        setError(
          "Saknar API-konfiguration. Kontrollera VITE_BACKEND_URL och VITE_API_KEY."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/api/orders`, {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Kunde inte hämta order. Status: ${res.status}`);
        }

        const json = await res.json();
        const orders = Array.isArray(json.orders) ? json.orders : [];

        if (orders.length === 0) {
          setError(
            "Ingen order hittades. Skapa en order i databasen för att simulera kvitto."
          );
          setLoading(false);
          return;
        }

        const latest = orders[orders.length - 1];

        const mapped: ReceiptOrder = {
          orderId: latest.orderId ?? latest._id ?? "okänd-order",
          items: (latest.items ?? []).map((item: any) => ({
            prodId: item.prodId ?? "",
            title: item.title ?? "Okänd produkt",
            price: Number(item.price ?? 0),
            qty: Number(item.qty ?? 0),
          })),
          price: Number(latest.price ?? 0),
          note: latest.note ?? "",
        };

        setOrder(mapped);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Ett oväntat fel inträffade vid hämtning av kvitto.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    void fetchLatestOrder();
  }, []);

  if (loading) {
    return (
      <div
        className="receipt-page"
        style={{ backgroundImage: `url(${mountains})` }}
      >
        <div className="receipt-overlay">
          <p className="receipt-status-text">Laddar kvitto...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div
        className="receipt-page"
        style={{ backgroundImage: `url(${mountains})` }}
      >
        <div className="receipt-overlay">
          <p className="receipt-status-text receipt-status-text--error">
            {error ?? "Kunde inte ladda kvittot."}
          </p>
        </div>
      </div>
    );
  }

  const serviceFee = 9;
  const total = order.price + serviceFee;
  const today = new Date().toLocaleDateString("sv-SE");

  return (
    <div
      className="receipt-page"
      style={{ backgroundImage: `url(${mountains})` }}
    >
      <div className="receipt-overlay">
        <header className="receipt-header">
          <img src={logo} alt="Nordic Bites" className="receipt-logo" />
          <h1 className="receipt-brand">Nordic Bites</h1>
          <h2 className="receipt-title">Kvitto</h2>
        </header>

        <main className="receipt-main">
          <section className="receipt-card" aria-label="Orderkvitto">
            <div className="receipt-items">
              {order.items.map((item) => (
                <div
                  key={`${item.prodId}-${item.title}`}
                  className="receipt-item-row"
                >
                  <span className="receipt-item-text">
                    {item.qty} x {item.title}
                  </span>
                  <span className="receipt-item-price">
                    {item.qty * item.price} kr
                  </span>
                </div>
              ))}
            </div>

            <hr className="receipt-divider" />

            <div className="receipt-summary">
              <div className="receipt-summary-row">
                <span>Summa</span>
                <span>{order.price} kr</span>
              </div>

              <div className="receipt-summary-row">
                <span>Serviceavgift</span>
                <span>{serviceFee} kr</span>
              </div>

              <div className="receipt-summary-row">
                <span>Datum</span>
                <span>{today}</span>
              </div>
            </div>

            <hr className="receipt-divider" />

            <div className="receipt-total">
              <div className="receipt-total-row">
                <span>Totalt</span>
                <span>{total} kr</span>
              </div>
              <p className="receipt-total-subtext">(inkl. moms och avgifter)</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
