// src/stores/AuthStore.ts
import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { v4 as uuid } from "uuid";

interface TokenPayload {
  id: string;
  role: string;
  exp: number;
}

interface AuthState {
  userId?: string;
  role?: string;
  setAuth: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: undefined,
  role: undefined,

  setAuth: () => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      console.log(decoded);
      set({ userId: decoded.id, role: decoded.role });
    } else {
      // If there is no token, we generate a guestId
      let guestId = localStorage.getItem("guestId");
      if (!guestId) {
        guestId = `guest-${uuid().substring(0, 5)}`;
        localStorage.setItem("guestId", guestId);
      }
      set({ userId: guestId, role: "guest" });
    }
  },

  clearAuth: () => {
    set({ userId: undefined, role: undefined });
    Cookies.remove("token");
  },
}));
