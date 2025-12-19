import Profile from "/icons/user.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginIcon.css";

const LoginIcon: React.FC = () => {
    const navigate = useNavigate();
    return (
        <img
            src={Profile}
            alt="Login Icon"
            className="loginIcon"
            onClick={() => {
                navigate("/login");
            }}
        />
    );
}   

export default LoginIcon;