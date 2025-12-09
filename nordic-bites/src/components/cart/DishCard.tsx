import React from "react";

export interface DishCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category?: string;
  onAdd?: () => void;
}

const DishCard: React.FC<DishCardProps> = ({ name, price, image, onAdd }) => {
  return (
    <article className="dish-card">
      {image ? <img src={image} alt={name} className="dish-image" /> : null}

      <div className="dish-info">
        <div>
          <p className="dish-name">{name}</p>
          <p className="dish-price">{price}</p>
        </div>

        <button className="add-btn" aria-label={`Add ${name}`} onClick={onAdd}>
          +
        </button>
      </div>
    </article>
  );
};

export default DishCard;
