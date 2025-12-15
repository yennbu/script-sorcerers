import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

type BackButtonProps = {
  to?: string;
  label?: string;
};

export const BackButton: FC<BackButtonProps> = ({ to, label = "Tillbaka" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="back-button" onClick={handleClick}>
      ← {label}
    </button>
  );
};

export default BackButton;