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
  isLoading: boolean;

  // gamla metoden – bakåtkompatibel
  setAuth: () => void;

  // nya metoden – login från backend
  setAuthFromBackend: (data: { userId: string; role: string }) => void;

  // NY – restore session från cookie/backend
  restoreSession: () => Promise<void>;

  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: undefined,
  role: undefined,
  isLoading: true,

  /**
   * GAMMAL METOD
   * Läser token från cookie (om den finns)
   * Behålls för bakåtkompatibilitet
   */
  setAuth: () => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
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

  /**
   * NY METOD
   * Används direkt efter login
   */
  setAuthFromBackend: ({ userId, role }) => {
    set({ userId, role });
  },

  /**
   * NY – RESTORE SESSION
   * Körs när appen startar
   */
  restoreSession: async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/me",
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Not logged in");

      const data = await res.json();

      set({
        userId: data.userId,
        role: data.role,
        isLoading: false
      });
    } catch {
      set({
        userId: undefined,
        role: undefined,
        isLoading: false
      });
    }
  },

  clearAuth: () => {
    set({ userId: undefined, role: undefined });
    Cookies.remove("token");
  }
}));
