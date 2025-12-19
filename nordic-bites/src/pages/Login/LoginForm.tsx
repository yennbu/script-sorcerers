import { NavLink, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Logo from "/images/Logo.png";
import { useState } from "react";
import { useAuthStore } from "../../Store/authStore";

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    message?: string;
    role?: string;
    userId?: string;
}

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const navigate = useNavigate();
    const setAuthFromBackend = useAuthStore((state) => state.setAuthFromBackend);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: LoginData = { email, password };

        try {
            const response: Response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "superhemlignyckel123",
                    },
                    body: JSON.stringify(data),
                    credentials: "include", // skicka httpOnly-cookie
                }
            );

            const result: LoginResponse = await response.json();

            console.log("LOGIN RESULT FROM BACKEND:", result);
            console.log("ROLE VALUE:", result.role);
            console.log("ROLE TYPE:", typeof result.role);

            if (result.success && result.role && result.userId) {
                const role = result.role.toLowerCase().trim();

                setAuthFromBackend({
                    userId: result.userId,
                    role
                });

                setSuccess(true);
                setErrorMsg("");

                setEmail("");
                setPassword("");

                navigate(role === "admin" ? "/admin/dashboard" : "/menu");
            } else {
                setErrorMsg(result.message || "Login failed");
            }

        } catch (error) {
            console.error("Login failed", error);
            setErrorMsg((error as Error).message || "An error occurred during login");
        }
    };

    return (
        <div className="loginForm-container">
            <div className="loginForm-header-container">
                <img src={Logo} alt="Nordic Bites Logo" className="loginForm-logo" />
                <h1 className="loginForm-title">Nordic Bites</h1>
            </div>

            <form className="loginForm-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="E-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="loginForm-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="loginForm-input"
                    required
                />
                <button className="loginForm-btn" type="submit">Logga in</button>
            </form>

            <p className="loginForm-register">
                Har du inget konto? <NavLink to="/register">Registrera dig här!</NavLink>
            </p>

            {success && <p className="loginForm-success-message">Inloggning lyckades! Du omdirigeras...</p>}
            {errorMsg && <p className="loginForm-error-message">{errorMsg}</p>}
        </div>
    );
};

export default LoginForm;
