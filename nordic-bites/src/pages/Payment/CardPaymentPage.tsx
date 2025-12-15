import { useState, type FormEvent } from "react";
import "../../styles/CardPaymentPage.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import cardIcon from "../../assets/icons/card.png";
import BackButton from "../../components/ui/BackButton";
import { useCartStore } from "../../Store/CartStore";

const CardPaymentPage: React.FC = () => {
  const { total, clearCart, createOrder } = useCartStore();
  const navigate = useNavigate();
  // TODO: Hämta detta värde från API / cart-context senare
  const totalAmount = total;

  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      setEmailError("Du måste fylla i din mailadress");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Ogiltig mailadress");
      return;
    }
    setEmailError("");
    try {
      const guestId = localStorage.getItem("guestId") || "";
      const orderId = await createOrder(guestId);
      if (orderId) {
        clearCart();
        navigate(`/confirmation?orderId=${orderId}`);
      } else {
        setEmailError("Kunde inte skapa ordern, försök igen.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setEmailError("Tekniskt fel vid ordern.");
    }
  };

  console.log("Kortbetalning skickad:", {
    cardNumber,
    expiryMonth,
    expiryYear,
    cvc,
    cardHolder,
    saveCard,
    email,
    totalAmount,
  });

  return (
    <div className="card-payment-page">
      <div className="card-payment-back-row">
        <BackButton to="/payment" label="Tillbaka" />
      </div>

      <header className="card-payment-header">
        <img src={logo} alt="Nordic Bites" className="card-payment-logo" />
        <h1 className="card-payment-title">Nordic Bites</h1>
      </header>

      <main className="card-payment-content">
        <h2 className="card-payment-heading">Kortbetalning</h2>

        <form className="card-payment-form" onSubmit={handleSubmit}>
          <div className="card-payment-card-brands">
            <img
              src={cardIcon}
              alt="Kortlogotyper"
              className="card-payment-card-brands-image"
            />
          </div>

          <div className="card-payment-field">
            <label className="card-payment-label" htmlFor="cardNumber">
              Kortnummer
            </label>
            <input
              id="cardNumber"
              type="text"
              className="card-payment-input"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="card-payment-row">
            <div className="card-payment-field">
              <label className="card-payment-label" htmlFor="expiryMonth">
                MM
              </label>
              <input
                id="expiryMonth"
                type="text"
                className="card-payment-input card-payment-input--small"
                placeholder="MM"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
              />
            </div>
            <div className="card-payment-field">
              <label className="card-payment-label" htmlFor="expiryYear">
                ÅÅ
              </label>
              <input
                id="expiryYear"
                type="text"
                className="card-payment-input card-payment-input--small"
                placeholder="ÅÅ"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
              />
            </div>
          </div>

          <div className="card-payment-field">
            <label className="card-payment-label" htmlFor="cvc">
              CVC
            </label>
            <input
              id="cvc"
              type="password"
              className="card-payment-input card-payment-input--small"
              placeholder="***"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>

          <div className="card-payment-field">
            <label className="card-payment-label" htmlFor="cardHolder">
              Namn på kortet
            </label>
            <input
              id="cardHolder"
              type="text"
              className="card-payment-input"
              placeholder="För- och efternamn"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />
          </div>

          <div className="card-payment-save-row">
            <label className="card-payment-save-label">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
              />
              <span>Spara kortet för en snabbare utcheckning nästa gång</span>
            </label>
          </div>

          <p className="card-payment-info-text">
            Genom att spara ditt kort ger du oss ditt samtycke till att lagra
            din betalningsmetod för framtida beställningar. Du kan återkalla
            ditt samtycke när som helst. För mer information, se vår{" "}
            <a href="#" className="card-payment-link">
              integritetspolicy
            </a>
            .
          </p>

          <div className="card-payment-total">
            <span>Totalt att betala:</span>
            <strong>{totalAmount} kr</strong>
          </div>

          <div className="card-payment-field">
            <label className="card-payment-label" htmlFor="email">
              Mailadress
            </label>
            <input
              id="email"
              type="email"
              className={`card-payment-input ${
                emailError ? "card-payment-input--error" : ""
              }`}
              placeholder="Fyll i din mailadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="card-payment-error">{emailError}</p>}
          </div>

          <button type="submit" className="card-payment-submit">
            Slutför köp
          </button>
        </form>
      </main>
    </div>
  );
};

export default CardPaymentPage;
