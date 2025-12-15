import type { FC } from "react";

type PaymentMethod = "card" | "swish" | "klarna";

type PaymentOptionProps = {
  id: PaymentMethod;
  label: string;
  icon: string;
  selected: boolean;
  onSelect: (id: PaymentMethod) => void;
};

export const PaymentOption: FC<PaymentOptionProps> = ({
  id,
  label,
  icon,
  selected,
  onSelect,
}) => {
  const handleClick = () => onSelect(id);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`payment-option ${selected ? "payment-option--selected" : ""}`}
    >
      <div className="payment-option__left">
        <span className="payment-option__radio"></span>
        <span className="payment-option__label">{label}</span>
      </div>

      <img src={icon} alt={label} className="payment-option__icon" />
    </button>
  );
};