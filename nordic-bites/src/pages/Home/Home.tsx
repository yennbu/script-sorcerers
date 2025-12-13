import { Link } from "react-router-dom";
import "../../styles/HomePage.css";
import heroImage from "../../assets/images/mountains.jpg";
import meatballsImage from "../../assets/images/köttbullar.jpg";
import northernImage from "../../assets/images/northern-lights.jpg";
import LoginIcon from "../../components/loginIcon/LoginIcon";

type MenuItem = {
  name: string;
  price: string;
};

const menuItems: MenuItem[] = [
  { name: "Köttbullar", price: "110 kr" },
  { name: "Smörgås", price: "75 kr" },
  { name: "Vegansk soppa", price: "85 kr" },
  { name: "Smörgås Deluxe", price: "75 kr" },
  { name: "Falafel med lingonsylt", price: "100 kr" },
  { name: "Kaffe & kanelbulle", price: "80 kr" },
];

export const Home = () => {
  return (
    <div className="home">
      <header
        className="home-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="home-hero__overlay">
          <LoginIcon />
          <div className="home-hero__content">
            <h1 className="home-hero__title">Nordic Bites</h1>
            <p className="home-hero__subtitle">
              Den nordiska matkulturen i en modern take-away upplevelse
            </p>
          </div>
        </div>
      </header>

      <section className="home-menu">
        <div className="home-menu-card">
          <h2 className="home-menu__title">Meny</h2>
          <ul className="home-menu__list">
            {menuItems.map((item) => (
              <li key={item.name} className="home-menu__item">
                <span className="home-menu__item-name">{item.name}</span>
                <span className="home-menu__item-price">{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="home-menu__button-wrapper">
            <Link to="/menu" className="home-menu__button">
              Beställ nu
            </Link>
          </div>
        </div>
      </section>

      <section className="home-image">
        <img
          src={meatballsImage}
          alt="Köttbullar med lingon"
          className="home-image__photo"
        />
      </section>

      <section
        className="home-hours"
        style={{ backgroundImage: `url(${northernImage})` }}
      >
        <div className="home-hours__overlay">
          <div className="home-hours__content">
            <h2 className="home-hours__title">Öppettider</h2>

            <ul className="home-hours__list">
              <li>Måndag – Fredag: 10:00 – 20:00</li>
              <li>Lördag: 11:00 – 18:00</li>
              <li>Söndag: Stängt</li>
            </ul>

            <Link to="/about" className="home-hours__button">
              Om oss
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
