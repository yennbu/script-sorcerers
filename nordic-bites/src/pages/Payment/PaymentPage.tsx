import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PaymentPage.css";

import logo from "../../assets/images/Logo.png";
import cardIcon from "../../assets/icons/card.png";
import swishIcon from "../../assets/icons/swish.png";
import klarnaIcon from "../../assets/icons/klarna.png";

import { PaymentOption } from "../../components/payment/PaymentOption";
import BackButton from "../../components/ui/BackButton";

type PaymentMethod = "card" | "swish" | "klarna";

const PaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const navigate = useNavigate();

  const handleSelect = (id: PaymentMethod) => {
    setSelectedMethod(id);
  };

  const handleContinue = () => {
    if (selectedMethod === "card") {
      navigate("/payment/card");
    } else if (selectedMethod === "swish") {
      navigate("/payment/swish");
    } else if (selectedMethod === "klarna") {
      navigate("/payment/klarna");
    }
  };

  return (
    <div className="payment-page">
      <header className="payment-header">
        <BackButton to="/cart" label="Tillbaka till kundvagn" />

        <img src={logo} alt="Nordic Bites logo" className="payment-logo" />
        <h1 className="payment-title">Nordic Bites</h1>
      </header>

      <div className="payment-content">
        <h2 className="payment-heading">Checkout / to pay</h2>
        <p className="payment-subheading">Betalning</p>

        <div className="payment-options">
          <PaymentOption
            id="card"
            label="Kortbetalning"
            icon={cardIcon}
            selected={selectedMethod === "card"}
            onSelect={handleSelect}
          />

          <PaymentOption
            id="swish"
            label="Swish"
            icon={swishIcon}
            selected={selectedMethod === "swish"}
            onSelect={handleSelect}
          />

          <PaymentOption
            id="klarna"
            label="Klarna"
            icon={klarnaIcon}
            selected={selectedMethod === "klarna"}
            onSelect={handleSelect}
          />
        </div>

        <button
          type="button"
          className="payment-continue-button"
          onClick={handleContinue}
        >
          Gå vidare
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;