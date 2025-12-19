import { NavLink } from "react-router-dom";
import "./RegisterPage.css";
import Logo from "/images/Logo.png";
import { useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface RegisterResponse {
    success: boolean;
    message?: string;
}

const registerPage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: RegisterData = {
            name: String(name),
            email: String(email),
            password: String(password),
            role: "user"
        };

        try {
            const response: Response = await fetch(`${API_URL}/api/auth/register`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": API_KEY || "",
                    }
                });

            const result: RegisterResponse = await response.json();

            if (result.success == true) {

                console.log("Registrering lyckades:", result);
                setName("");
                setEmail("");
                setPassword("");
                setErrorMsg("");
                setSuccess(true);
            } else {
                console.error("Registrering misslyckades:", result.message);
                setErrorMsg(result.message || "Registrering misslyckades");
                setSuccess(false);
            }

            console.log("Registrering lyckades:", data);

        } catch (error) {
            console.error("Fel vid registrering:", error);
            setErrorMsg("Något gick fel. Försök igen senare.");
            setSuccess(false);
        }
    };

    return (
        <div className="registerPage-container">
            <div className="registerPage-header-container">
                <img src={Logo} alt="Nordic Bites Logo" className="registerPage-logo" />
                <h1 className="registerPage-title">Nordic Bites</h1>
            </div>
            <form action="" className="registerPage-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Namn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="registerPage-input" />
                <input
                    type="email"
                    placeholder="E-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="registerPage-input" />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="registerPage-input" />
                <button className="registerPage-btn" type="submit">Skapa konto</button>
            </form>

            {!success && <p className="loginForm-register">Har du redan ett konto? <NavLink to="/loginForm">Logga in här!</NavLink></p>}
            {success && <p className="registerPage-success-message">Registrering lyckades! Du kan nu <NavLink to="/loginForm">logga in</NavLink>.</p>}
            {errorMsg && <p className="registerPage-error-message">{errorMsg}</p>}
        </div>
    )
}

export default registerPage;