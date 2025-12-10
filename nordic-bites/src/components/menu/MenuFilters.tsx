import React from "react";

type PriceOrder = "asc" | "desc" | "none";
type PopularFilter = "all" | "popular";

interface Props {
  category: string;
  setCategory: (v: string) => void;

  priceOrder: PriceOrder;
  setPriceOrder: (v: PriceOrder) => void;

  popularFilter: PopularFilter;
  setPopularFilter: (v: PopularFilter) => void;

  categories: string[];
}

export function MenuFilters({
  category,
  setCategory,
  priceOrder,
  setPriceOrder,
  popularFilter,
  setPopularFilter,
  categories,
}: Props) {
  return (
    <div className="menu-filters">
      <label>
        Kategori:
        <select
          value={category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
        >
          <option value="alla">Alla</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label>
        Sortera pris:
        <select
          value={priceOrder}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPriceOrder(e.target.value as PriceOrder)
          }
        >
          <option value="none">Ingen</option>
          <option value="asc">Lägst först</option>
          <option value="desc">Högst först</option>
        </select>
      </label>

      <label>
        Popularitet:
        <select
          value={popularFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPopularFilter(e.target.value as PopularFilter)
          }
        >
          <option value="all">Alla</option>
          <option value="popular">Populära</option>
        </select>
      </label>
    </div>
  );
}
