import { NavLink } from "react-router-dom";
import HomeIcon from "../../assets/icons/home.svg";
import FoodIcon from "../../assets/icons/food.svg";
import CartIcon from "../../assets/icons/cart.svg";
import ReceiptIcon from "../../assets/icons/receipt.svg";
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
  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav__list">
        {navItems.map((item) => (
          <li key={item.to} className="bottom-nav__item">
          {/* aktiv länk markeras med NavLink */}
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                ["bottom-nav__link", isActive ? "bottom-nav__link--active" : ""]
                  .join(" ")
                  .trim()
              }
            >
              <img
                src={item.icon}
                alt={item.label}
                className="bottom-nav__icon"
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};