import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";
import "./logoutIcon.css";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const LogoutButton = () => {
    const navigate = useNavigate();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const handleLogout = async () => {
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "x-api-key": API_KEY,
                    "Content-Type": "application/json",
                },
            });

            clearAuth();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <button className="logout-btn" onClick={handleLogout}>
            Logga ut
        </button>
    );
};

export default LogoutButton;
