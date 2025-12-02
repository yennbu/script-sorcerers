import "../../styles/MenuPage.css";
import DishCard from "../../components/cart/DishCard";
import meatballsImg from "../../assets/images/köttbullar.jpg";
import kroppkakorImg from "../../assets/images/kroppkakor.jpg";
import logo from "../../assets/images/Logo.png";

const MenyPage: React.FC = () => {
  return (
    <div className="menu-page">
      <header className="menu-header">
        <img src={logo} alt="Nordic Bites logo" className="about-logo" />
        <button className="profile-btn" aria-label="Profile"></button>
      </header>

      <section className="search-wrapper">
        <input type="text" placeholder="Sök rätt..." />
        <span className="search-icon" aria-hidden="true"></span>
      </section>

      <h1 className="menu-title">Meny</h1>

      <section className="category-section">
        <div className="line"></div>
        <h2 className="category-title">Huvudrätter</h2>
        <div className="line"></div>
      </section>

      <section className="dish-list">
        <DishCard name="Köttbullar" price="110 kr" image={meatballsImg} />
        <DishCard name="Kroppkakor" price="110 kr" image={kroppkakorImg} />
        <DishCard name="Köttbullar" price="110 kr" image={meatballsImg} />
      </section>
    </div>
  );
};

export default MenyPage;
