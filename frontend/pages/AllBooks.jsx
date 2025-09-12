import React, { useEffect } from 'react'
import useBookStore from '../store/getBooks.js'
import { Slab } from 'react-loading-indicators'
import {BlurFade} from '../src/components/magicui/blur-fade.jsx'
import { Link } from 'react-router-dom';

function AllBooks() {

    const { books, loading, error, fetchBooks } = useBookStore();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    if (loading) return (
        <div className='h-[100vh] bg-secondary/50 flex items-center justify-center'>
            <Slab text='loading...' color={["#ccc331"]} style={{ fontSize: "24px" }} />
        </div>
    );

    if (error) return <p className='text-red-500'>Error: {error}</p>

    return (
        <div className='bg-secondary/50 min-h-[100vh] px-4 py-8'>
          <BlurFade duration={1} direction='up'>
            <h1 className='text-4xl font-semibold mb-8'>Our offerings...</h1>
            </BlurFade>
            <BlurFade duration={1} direction='up'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {books.map((book) => (
                  <Link to={`/view-book-details/${book._id}`} key={book._id}>
                    <div className='hover:scale-105 transition-all duration-400 text-white text-shadow-lg shadow-2xl bg-primary rounded-lg p-4 flex flex-col items-center'>
                        <img 
                            src={book.url} 
                            alt={book.title} 
                            className='h-40 w-full object-cover rounded-md mb-4' 
                        />
                        <h2 className='text-2xl font-extrabold mb-1'>{book.title}</h2>
                        <p className='text-sm mb-1'>by {book.author}</p>
                        <p className='text-sm font-semibold mb-2'>${book.price}</p>
                        <p className='text-sm mb-2'>{book.language}</p>
                    </div>
                    </Link>
                ))}
                
            </div>
            </BlurFade>
        </div>
    )
}

export default AllBooks
