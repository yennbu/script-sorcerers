import "../../styles/AboutPage.css";
import logo from "../../assets/images/Logo.png";
import familyImage from "../../assets/images/familyImage.png";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <img src={logo} alt="Nordic Bites logo" className="about-logo" />
        <h1 className="about-title">Nordic Bites</h1>
      </div>
      <h2 className="about-subtitle">Om oss</h2>

      <div className="about-card">
        <p>
          Nordic Bites föddes ur idén att ta den nordiska matkulturen till en
          modern take away-upplevelse. Vi kombinerar traditionella smaker med
          ett minimalistiskt uttryck, och gör det enkelt för dig att njuta av
          kvalitetsmat var du än är.
        </p>
        <p>
          Nordic Bites föddes ur idén att ta den nordiska matkulturen till en
          modern take away-upplevelse. Vi kombinerar traditionella smaker med
          ett minimalistiskt uttryck, och gör det enkelt för dig att njuta av
          kvalitetsmat var du än är. Vår meny är inspirerad av naturens rena
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
    </div>
  );
};

export default AboutPage;
