import "../../styles/AboutPage.css";
import logo from "/images/Logo.png";
import familyImage from "/images/familyImage.png";
import { BottomNav } from "../../components/layout/BottomNav";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <img src={logo} alt="Nordic Bites logo" className="about-logo" />
        <h1 className="about-title">Nordic Bites</h1>
      </div>
      <h2 className="about-subtitle">Om oss</h2>

      <div className="about-card">
        <p className="about-text">
          Nordic Bites föddes ur idén att ta den nordiska matkulturen till en
          modern take away-upplevelse. Vi kombinerar traditionella smaker med
          ett minimalistiskt uttryck, och gör det enkelt för dig att njuta av
          kvalitetsmat var du än är.
        </p>
        <p className="about-text">
          Vår meny är inspirerad av naturens rena
          råvaror och generationers hantverk, där varje rätt är noggrant
          sammansatt för att ge både smak och balans. Vi tror på hållbarhet,
          enkelhet och en visuell estetik som speglar det nordiska landskapet –
          från fjällens stillhet till kustens friskhet. Oavsett om du är på
          språng, hemma eller på kontoret, vill vi att varje tugga ska kännas
          som en paus i vardagen – en stund av nordisk harmoni.
        </p>

        <img
          src={familyImage}
          alt="Family enjoying Nordic Bites"
          className="about-photo"
        />
      </div>

      <section className="about-contact">
        <h2 className="contact-subtitle">Kontakta oss</h2>

        <div className="about-contact-bar">
          <div className="contact-row">
            <span className="label">Företag: </span>
            <span className="value">Nordic Bites AB</span>
          </div>
          <div className="contact-row">
            <span className="label">Adress: </span>
            <span className="value">Storgatan 12, 114 55</span>
          </div>
          <div className="contact-row">
            <span className="label">Stad: </span>
            <span className="value">Stockholm</span>
          </div>
          <div className="contact-row">
            <span className="label">Telefon: </span>
            <span className="value">+46 8 123 456 78</span>
          </div>

          <div className="contact-row">
            <span className="label">Email: </span>
            <span className="value">kontakt@nordicbites.se</span>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default AboutPage;
