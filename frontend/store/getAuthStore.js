import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,           
  token: null,          
  loading: false,
  error: null,

  signup: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Signup failed");
      localStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user || { email }, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Login failed");
      localStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user || { email }, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  loadUserFromStorage: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:8000/api/auth/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) set({ user: data.user, token });
    } catch (err) {
      console.error(err);
    }
  },
}));
