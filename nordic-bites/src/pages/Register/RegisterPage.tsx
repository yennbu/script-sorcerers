import { NavLink } from "react-router-dom";
import "./RegisterPage.css";
import Logo from "../../assets/images/Logo.png";

const registerPage = () => {
    return (
        <div className="registerPage-container">
            <div className="registerPage-header-container">
                <img src={Logo} alt="Nordic Bites Logo" className="registerPage-logo" />
                <h1 className="registerPage-title">Nordic Bites</h1>
            </div>
            <form action="" className="registerPage-form">
                <input
                    type="text"
                    placeholder="Namn"
                    className="registerPage-input" />
                <input
                    type="email"
                    placeholder="E-post"
                    className="registerPage-input" />
                <input
                    type="password"
                    placeholder="Lösenord"
                    className="registerPage-input" />
                <button className="registerPage-btn">Skapa konto</button>
            </form>
            <p className="loginForm-register">Har du redan ett konto? <NavLink to="/loginForm">Logga in här!</NavLink></p>
        </div>
    )
}

export default registerPage;