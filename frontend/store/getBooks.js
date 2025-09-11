import {create} from "zustand";

const useBookStore = create((set) => ({
    books: [],
    loading: false,
    error: null,

    fetchBooks: async () => {
        set({loading: true, error: null});
        try {
            const res = await fetch('http://localhost:8001/api/books/getBooks');
            const data = await res.json();
            set({books: data.books, loading: false});
        } catch (error) {
            console.log(error);
            set({error: error.message, loading: false});
        }
    }

}))

export default useBookStore;