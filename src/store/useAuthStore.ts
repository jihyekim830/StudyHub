import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "@/types/api-response-type/auth-response-type";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: UserInfo | null;
  setAccessToken: (token: string) => void;
  setUserInfo: (user: UserInfo) => void;
  deleteAccessToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      user: null,

      setAccessToken: (token) => {
        set({ isLoggedIn: true, accessToken: token });
      },

      setUserInfo: (user) => {
        set({ user });
      },

      deleteAccessToken: () => {
        set({ isLoggedIn: false, accessToken: null, user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
