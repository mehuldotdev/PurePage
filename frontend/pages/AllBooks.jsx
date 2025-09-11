import React, { useEffect } from 'react'
import useBookStore from '../store/getBooks.js'

function AllBooks() {

    const {books, loading, error, fetchBooks} = useBookStore();

    useEffect(()=> {
        fetchBooks();
    }, [fetchBooks]);

    if(loading) return <p>Loading</p>
    if(error) return <p>Error: {error}</p>

  return (
    <div>
        {books.map((book) => (
            <div key={book._id}>{book.title}</div>
        ))}
    </div>
  )
}

export default AllBooks