// src/stores/AuthStore.ts
import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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
    }
  },

  clearAuth: () => {
    set({ userId: undefined, role: undefined });
    Cookies.remove("token");
  },
}));
