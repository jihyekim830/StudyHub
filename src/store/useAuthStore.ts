import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  deleteAccessToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,

      setAccessToken: (token) => {
        set({ isLoggedIn: true, accessToken: token });
      },

      deleteAccessToken: () => {
        set({ isLoggedIn: false, accessToken: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
