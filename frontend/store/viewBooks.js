import { create } from "zustand";

const useBookDetailsStore = create((set) => ({
  book: null,
  loading: false,
  error: null,

  fetchBookById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`http://localhost:8001/api/books/${id}`);
      const data = await res.json();
      set({ book: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearBook: () => set({ book: null, loading: false, error: null }),
}));

export default useBookDetailsStore;
