import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";

const LogoutButton = () => {
    const navigate = useNavigate();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3000/api/auth/logout", {
                method: "GET",
                credentials: "include", // 🔑 krävs för cookie
            });

            clearAuth();          // rensa Zustand-store
            navigate("/login");  // skicka till login
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logga ut
        </button>
    );
};

export default LogoutButton;
