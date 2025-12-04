import "../../styles/MenuPage.css";
import DishCard from "../../components/cart/DishCard";
import logo from "../../assets/images/Logo.png";
import meatballsImg from "../../assets/images/köttbullar.jpg";
import kroppkakorImg from "../../assets/images/kroppkakor.jpg";
import Cola from "../../assets/images/Cola.png";
import { BottomNav } from "../../components/layout/BottomNav";

const MenyPage: React.FC = () => {
  return (
    <div className="menu-page">
      <section className="menu-header">
        <img src={logo} alt="Nordic Bites logo" className="Menu-logo" />
        <h1 className="about-title">Nordic Bites</h1>
      </section>

      <section className="search-wrapper">
        <input className="menu-input" type="text" placeholder="Sök rätt..." />
      </section>

      <h1 className="menu-title">Meny</h1>

      <section className="category-section">
        <div className="line"></div>
        <h2 className="category-title">Huvudrätter</h2>
        <div className="line"></div>
      </section>

      <div className="dish-list">
        <DishCard name="Köttbullar" price="110 kr" image={meatballsImg} />
        <DishCard name="Kroppkakor" price="110 kr" image={kroppkakorImg} />
        <DishCard name="Köttbullar" price="110 kr" image={meatballsImg} />
      </div>

      <section className="category-section">
        <div className="line"></div>
        <h2 className="category-title">Drycker</h2>
        <div className="line"></div>
      </section>

      <div className="dishlist-Cola">
        <DishCard name="Coca Cola" price="30 kr" image={Cola} />
      </div>
      <BottomNav />
    </div>
  );
};
export default MenyPage;
