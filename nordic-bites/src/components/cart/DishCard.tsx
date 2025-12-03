import React from "react";

export interface DishCardProps {
  name: string;
  price: string;
  image: string;
  category?: string;
}

const DishCard: React.FC<DishCardProps> = ({
  name,
  price,
  image,
  category,
}) => {
  return (
    <div className="dish-card">
      <img src={image} alt={name} className="dish-image" />

      <div className="dish-info">
        <div>
          <p className="dish-name">{name}</p>
          <p className="dish-price">{price}</p>
          {category && <p className="dish-category">{category}</p>}
        </div>

        <button className="add-btn" aria-label={`Add ${name}`}>
          +
        </button>
      </div>
    </div>
  );
};

export default DishCard;
