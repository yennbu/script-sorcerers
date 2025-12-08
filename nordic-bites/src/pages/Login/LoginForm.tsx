import { NavLink } from "react-router-dom";
import "./LoginPage.css";
import Logo from "../../assets/images/Logo.png";

const LoginForm = () => {
    return (
        <div className="loginForm-container">
            <div className="loginForm-header-container">
                <img src={Logo} alt="Nordic Bites Logo" className="loginForm-logo" />
                <h1 className="loginForm-title">Nordic Bites</h1>
            </div>
            <form action="" className="loginForm-form">
                <input
                    type="email"
                    placeholder="E-post"
                    className="loginForm-input" />
                <input
                    type="password"
                    placeholder="Lösenord"
                    className="loginForm-input" />
                <button className="loginForm-btn">Logga in</button>
            </form>
            <p className="loginForm-register">Har du inget konto? <NavLink to="/register">Registrera dig här!</NavLink></p>
        </div>
    )
}

export default LoginForm;