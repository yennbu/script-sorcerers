import { NavLink } from "react-router-dom";
import HomeIcon from "/icons/home.svg";
import FoodIcon from "/icons/food.svg";
import CartIcon from "/icons/cart.svg";
import ReceiptIcon from "/icons/receipt.svg";
import { useTotalQuantity } from "../../Store/CartStore";
import "./BottomNav.css";

type NavItem = {
  to: string;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { to: "/", label: "Hem", icon: HomeIcon },
  { to: "/menu", label: "Meny", icon: FoodIcon },
  { to: "/cart", label: "Korg", icon: CartIcon },
  { to: "/orders", label: "Order", icon: ReceiptIcon },
];

export const BottomNav = () => {
  const cartItemCount = useTotalQuantity();
  console.log(cartItemCount);
  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav__list">
        {navItems.map((item) => (
          <li key={item.to} className="bottom-nav__item">
            {/* aktiv länk markeras med NavLink */}
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                [
                  "bottom-nav__link",
                  isActive ? "bottom-nav__link--active" : "",
                  item.to === "/cart" && cartItemCount > 0
                    ? "bottom-nav__link--in-cart"
                    : "",
                ]
                  .join(" ")
                  .trim()
              }
            >
              <img
                src={item.icon}
                alt={item.label}
                className="bottom-nav__icon"
              />
              {item.to === "/cart" && cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
