import "../../styles/MenuPage.css";
import DishCard from "../../components/cart/DishCard";
import logo from "../../assets/images/Logo.png";
import { BottomNav } from "../../components/layout/BottomNav";
import { useMenu } from "../../hooks/useMenu";
import { useState, useMemo } from "react";
import { useCartStore } from "../../components/cart/CartStore";

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
  const addItem = useCartStore((state) => state.addItem);
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("none");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = [...menuItems];

    if (q !== "") {
      result = result.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(q);
        const categoryMatch = item.category?.toLowerCase().includes(q);
        const imageMatch = item.image?.toLowerCase().includes(q);
        const priceMatch =
          String(item.price).includes(q) || item.price === Number(q);

        return nameMatch || categoryMatch || imageMatch || priceMatch;
      });
    }

    if (typeFilter !== "all") {
      result = result.filter(
        (item) => Number(item.type) === Number(typeFilter)
      );
    }

    if (priceSort === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [menuItems, search, typeFilter, priceSort]);

  if (loading) {
    return <p className="menu-loading">Laddar meny...</p>;
  }

  if (error) {
    return <p className="menu-error">{error}</p>;
  }
  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="menu-page">
      <section className="menu-header">
        <img src={logo} alt="Nordic Bites logo" className="Menu-logo" />
        <h1 className="about-title">Nordic Bites</h1>
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
        <label htmlFor="typeFilter" className="filter-label">
          Välj kategori:
        </label>
        <select
          id="typeFilter"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Alla typer</option>
          <option value="0">Maträtt</option>
          <option value="1">Dryck</option>
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
      {filteredItems.some((item: MenuItem) => item.type === 0) && (
        <>
          <section className="category-section">
            <div className="line"></div>
            <h2 className="category-title">Huvudrätter</h2>
            <div className="line"></div>
          </section>

          <section className="dish-list">
            {filteredItems
              .filter((item: MenuItem) => item.type !== 1)
              .map((item: MenuItem) => (
                <DishCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={`${item.price} kr`}
                  image={item.image || ""}
                  category={item.category}
                  onAdd={() => handleAddToCart(item)}
                />
              ))}
          </section>
        </>
      )}
      {filteredItems.some((item: MenuItem) => item.type === 1) && (
        <>
          <section className="category-section">
            <div className="line"></div>
            <h2 className="category-title">Drycker</h2>
            <div className="line"></div>
          </section>

          <section className="dishlist-Cola">
            {filteredItems
              .filter((item: MenuItem) => item.type === 1)
              .map((item: MenuItem) => (
                <DishCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={`${item.price} kr`}
                  image={item.image}
                  category={item.category}
                  onAdd={() => handleAddToCart(item)}
                />
              ))}
          </section>
        </>
      )}
      <BottomNav />
    </div>
  );
};
export default MenyPage;
