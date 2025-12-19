import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";
import "./logoutIcon.css";

const LogoutButton = () => {
    const navigate = useNavigate();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const handleLogout = async () => {
        try {
            await fetch("https://script-sorcerers.onrender.com/api/auth/logout", {
                method: "GET",
                credentials: "include",
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
