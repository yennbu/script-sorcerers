import "../../styles/MenuPage.css";
import DishCard from "../../components/cart/DishCard";
import logo from "../../assets/images/Logo.png";
import { BottomNav } from "../../components/layout/BottomNav";
import { useMenu } from "../../Hooks/useMenu";
import { useState } from "react";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  type: number;
}

const MenyPage: React.FC = () => {
  const { data: menuItems, loading, error } = useMenu();
  const [cart, setCart] = useState<MenuItem[]>([]);
  console.log(cart);
  if (loading) {
    return <p className="menu-loading">Laddar meny...</p>;
  }

  if (error) {
    return <p className="menu-error">{error}</p>;
  }

  // 👇 Aquí va la lógica
  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };
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

      <section className="dish-list">
        {menuItems
          .filter((item: MenuItem) => item.type !== 1)
          .map((item: MenuItem) => (
            <DishCard
              key={item.id}
              name={item.name}
              price={`${item.price} kr`}
              image={item.image || ""}
              category={item.category}
              onAdd={() => handleAddToCart(item)}
            />
          ))}
      </section>

      <section className="category-section">
        <div className="line"></div>
        <h2 className="category-title">Drycker</h2>
        <div className="line"></div>
      </section>

      <div className="dishlist-Cola">
        {menuItems
          .filter((item: MenuItem) => item.type === 1)
          .map((item: MenuItem) => (
            <DishCard
              key={item.id}
              name={item.name}
              price={`${item.price} kr`}
              image={item.image}
              category={item.category}
              onAdd={() => handleAddToCart(item)}
            />
          ))}
      </div>
      <BottomNav />
    </div>
  );
};
export default MenyPage;
