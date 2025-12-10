import "../../styles/MenuPage.css";
import DishCard from "../../components/cart/DishCard";
import logo from "../../assets/images/Logo.png";
import { BottomNav } from "../../components/layout/BottomNav";
import { useMenu } from "../../Hooks/useMenu";
import { useState, useMemo } from "react";

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

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("none");

  if (loading) {
    return <p className="menu-loading">Laddar meny...</p>;
  }

  if (error) {
    return <p className="menu-error">{error}</p>;
  }

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const filteredItems = useMemo(() => {
    let result = [...menuItems];

    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (priceSort === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [menuItems, search, categoryFilter, priceSort]);

  return (
    <div className="menu-page">
      <section className="menu-header">
        <img src={logo} alt="Nordic Bites logo" className="Menu-logo" />
        <h1 className="about-title">Nordic Bites</h1>
      </section>

      <section className="search-wrapper">
        <input className="menu-input" type="text" placeholder="Sök rätt..." />
      </section>

      <section className="search-wrapper">
        <input
          className="menu-input"
          type="text"
          placeholder="Sök rätt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="filter-controls">
        <label htmlFor="categoryFilter" className="filter-label">
          Välj kategori:
        </label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Alla kategorier</option>
          <option value="Kött">Kött</option>
          <option value="Vegetarisk">Vegetarisk</option>
          <option value="Dryck">Dryck</option>
        </select>

        <label htmlFor="priceSort" className="filter-label">
          Sortera efter pris:
        </label>
        <select
          id="priceSort"
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="filter-select"
        >
          <option value="none">Sortera pris</option>
          <option value="asc">Lägst pris</option>
          <option value="desc">Högst pris</option>
        </select>
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
