import { create } from "zustand";
import AuthServices from "../services/auth.service";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      AuthServices.checkAuth().then((res) => set({ authUser: res.data }));
    } catch (error) {
      console.log("Error in check auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      AuthServices.signUp(data).then((res) => {
        set({ authUser: res.data });
        toast.success("Account create successfully!");
      });
    } catch (error) {
      console.log("Error in signUp", error);
      toast.error("Failed to create new user!");
    } finally {
      set({ isSigningUp: false });
    }
  },
  signIn: async (data) => {
    set({ isLoggingIn: true });
    try {
      AuthServices.signIn(data).then((res) => {
        set({ authUser: res.data });
        toast.success("Logged in successfully!");
      });
    } catch (error) {
      console.log("Error in signIn", error);
      toast.error("Failed to logging in user!");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      AuthServices.logout().then(() => {
        toast.success("Logged out successfully!");
        window.location.reload();
      });
    } catch (error) {
      console.log("Error in logout", error);
    }
  },
}));
