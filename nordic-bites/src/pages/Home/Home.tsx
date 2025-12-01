import React from "react";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <img src="/logo.svg" alt="Nordic Bites logo" className="home-logo" />
        <h1>Välkommen till Nordic Bites</h1>
        <p>Upptäck vår nordiska meny och beställ enkelt online.</p>
      </header>

      <main className="home-main">
        <section className="highlight-section">
          <h2>Vad gör oss unika?</h2>
          <ul>
            <li>🌿 Lokala råvaror</li>
            <li>⚡ Snabb take-away</li>
            <li>🎨 Minimalistisk design</li>
          </ul>
        </section>

        <section className="cta-section">
          <button className="order-button">Beställ nu</button>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 Nordic Bites. Alla rättigheter förbehållna.</p>
      </footer>
    </div>
  );
};

export default Home;
