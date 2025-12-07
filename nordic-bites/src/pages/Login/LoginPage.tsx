import { NavLink } from "react-router-dom";
import { BottomNav } from "../../components/layout/BottomNav";
import "./LoginPage.css";
import Logo from "../../assets/images/Logo.png";

const LoginPage = () => {
    return (
        <div className="loginPage-container">
            <div className="loginPage-header-container">
                <img src={Logo} alt="Nordic Bites Logo" className="loginPage-logo" />
                <h1 className="loginPage-title">Nordic Bites</h1>
            </div>
            <div className="loginPage-btn-container">
                <button className="loginPage-btn">Logga in</button>
                <NavLink to="/register" className="loginPage-register-link">
                    <button className="loginPage-btn">Skapa konto</button>
                </NavLink>
            </div>
            <BottomNav />
        </div>
    );

}

export default LoginPage;