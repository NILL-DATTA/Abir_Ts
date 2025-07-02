import { create } from "zustand";
import { Cookies } from "react-cookie";

interface UserState {
  token: string | null;
  logout: () => void;
  setTokenAndUser: (token: string) => void;
}
const cookie = new Cookies();
const useUserStore = create<UserState>((set) => ({
  token: cookie.get("Token") || null,
  user: null,
  name: null,

  setTokenAndUser: (token: string, user?: any) => {
    if (token) {
      cookie.set("Token", token, {
        path: "/",
        secure: true,
      });
      set({ token });
    }
  },

  logout: () => {
    cookie.remove("Token", { path: "/" });
    set({ token: null });
  },
}));

export default useUserStore;
