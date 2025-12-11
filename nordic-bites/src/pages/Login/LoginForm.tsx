import { NavLink } from "react-router-dom";
import "./LoginPage.css";
import Logo from "../../assets/images/Logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    message?: string;
}

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: LoginData = {
            email: String(email),
            password: String(password)
        };

        try {
            const response: Response = await fetch("https://script-sorcerers.onrender.com/api/auth/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "superhemlignyckel123"
                },
                credentials: "include"
            });

            const result: LoginResponse = await response.json();

            if (result.success == true) {
                console.log("Login successful:", response);
                setSuccess(true);
                setErrorMsg("");

                setEmail("");
                setPassword("");

                navigate("/menu");
            } else {
                console.error("Login failed:", result.message);
                setErrorMsg(result.message || "Login failed");
            }

            console.log("Form submitted");
        } catch (error) {
            console.error("Login failed", error);
            setErrorMsg("An error occurred during login");
        }
    };

    async function getUser() {
        const res = await fetch("https://script-sorcerers.onrender.com/api/auth/me", {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();
        console.log("Current user:", data);
    };

    return (
        <div className="loginForm-container">
            <div className="loginForm-header-container">
                <img src={Logo} alt="Nordic Bites Logo" className="loginForm-logo" />
                <h1 className="loginForm-title">Nordic Bites</h1>
            </div>
            <form action="" className="loginForm-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="E-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="loginForm-input" />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="loginForm-input" />
                <button className="loginForm-btn" type="submit">Logga in</button>
            </form>
            <p className="loginForm-register">Har du inget konto? <NavLink to="/register">Registrera dig här!</NavLink></p>
            {success && <p className="loginForm-success-message">Inloggning lyckades! Du omdirigeras till menyn...</p>}
            {errorMsg && <p className="loginForm-error-message">{errorMsg}</p>}
        </div>
    )
}

export default LoginForm;