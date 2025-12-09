import React from "react";

export interface DishCardProps {
  name: string;
  price: string;
  image: string;
  category?: string;
  onAdd?: () => void;
}

const DishCard: React.FC<DishCardProps> = ({
  name,
  price,
  image,
  category,
  onAdd,
}) => {
  return (
    <article className="dish-card">
      {image ? <img src={image} alt={name} className="dish-image" /> : null}

      <div className="dish-info">
        <div>
          <p className="dish-name">{name}</p>
          <p className="dish-price">{price}</p>
          {category && <p className="dish-category">{category}</p>}
        </div>

        <button className="add-btn" aria-label={`Add ${name}`} onClick={onAdd}>
          +
        </button>
      </div>
    </article>
  );
};

export default DishCard;
