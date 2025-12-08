import { NavLink } from "react-router-dom";
import "./RegisterPage.css";
import Logo from "../../assets/images/Logo.png";
import { useState } from "react";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: string;
}

const registerPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: RegisterData = {
            name: "Test User",
            email: "email",
            password: "password123",
            role: "user"
        };

        try {
            const response = await fetch("https://script-sorcerers.onrender.com/api/auth/register",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "superhemlignyckel123"
                    }
                });

            const result = await response.json();
            
            if (result.success == true) {
                
                console.log("Registrering lyckades:", result);
                setName("");
                setEmail("");
                setPassword("");

                setSuccess(true);
            }

            console.log("Registrering lyckades:", data);

        } catch (error) {
            console.error("Fel vid registrering:", error);
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
                    type="text"
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
            <p className="loginForm-register">Har du redan ett konto? <NavLink to="/loginForm">Logga in här!</NavLink></p>
        </div>
    )
}

export default registerPage;