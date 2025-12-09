import "./CartPage.css";
import { useCartStore } from "../../components/cart/CartStore";
import logo from "../../assets/images/Logo.png";

const CartPage: React.FC = () => {
  const { items, total, addItem, removeItem } = useCartStore();

  return (
    <div className="order-summary">
      <div className="cart-header">
        <img src={logo} alt="Nordic Bites logo" className="Cart-logo" />
        <h1 className="title">Nordic Bites</h1>
      </div>
      <p className="subtitle">Din Beställning</p>

      <div className="items">
        {items.map((item) => (
          <div className="item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <span className="item-name">
              {item.quantity} x {item.name}
            </span>
            <div className="controls">
              <button className="delete" onClick={() => removeItem(item.id)}>
                🗑️
              </button>
              <span className="quantity">{item.quantity}</span>
              <button className="add" onClick={() => addItem(item)}>
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

      <button className="checkout-btn">Gå till Kassan</button>
    </div>
  );
};

export default CartPage;
