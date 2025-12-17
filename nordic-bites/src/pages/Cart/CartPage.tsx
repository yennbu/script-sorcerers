import "./CartPage.css";
import React from "react";
import { useCartStore } from "../../Store/CartStore";
import logo from "/images/Logo.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";

const CartPage: React.FC = () => {
  const { items, total, addItem, removeItem } = useCartStore();
  const navigate = useNavigate();
  const { userId, setAuth } = useAuthStore();

  React.useEffect(() => {
    setAuth();
  }, [setAuth]);

  return (
    <div className="order-summary">
      <div className="cart-header">
        <img src={logo} alt="Nordic Bites logo" className="Cart-logo" />
        <h1 className="title">Nordic Bites</h1>
      </div>
      <p className="subtitle">Din Beställning</p>

      <div className="items">
        {items.map((item) => (
          <div className="item" key={item.prodId}>
            <img src={item.image} alt={item.name} />
            <span className="item-name">
              {item.quantity} x {item.name}
            </span>
            <div className="controls">
              <button
                className="delete"
                onClick={() => removeItem(item.prodId, userId!)}
              >
                🗑️
              </button>
              <span className="quantity">{item.quantity}</span>
              <button className="add" onClick={() => addItem(item, userId!)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className="total">
        <span>Totalt</span>
        <span>{total} kr</span>
      </div>
      <p className="note">(inkl. moms och avgifter)</p>

      <button className="checkout-btn" onClick={() => navigate("/payment")}>
        Gå till Kassan
      </button>
    </div>
  );
};

export default CartPage;
