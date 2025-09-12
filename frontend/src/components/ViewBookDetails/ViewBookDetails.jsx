import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Slab } from 'react-loading-indicators';
import useBookDetailsStore from '../../../store/viewBooks';
import { BlurFade } from '../magicui/blur-fade.jsx';

function ViewBookDetails() {
  const { bookId } = useParams();
  const { book, loading, error, fetchBookById, clearBook } = useBookDetailsStore();

  useEffect(() => {
    fetchBookById(bookId);

    return () => clearBook();
  }, [bookId]);

  if (loading) return (
    <div className='h-[100vh] flex items-center justify-center bg-secondary/50'>
      <Slab text="Loading..." color={["#ccc331"]} style={{ fontSize: "24px" }} />
    </div>
  );

  if (error) return <p className='text-red-500'>Error: {error}</p>;
  if (!book) return <p className='text-gray-500'>Book not found!</p>;

  return (
    <div className='min-h-[100vh] bg-secondary/50 flex flex-col items-center py-8 px-4'>
        <BlurFade direction='up' duration={1}>
      <div className='bg-primary rounded-lg shadow-2xl p-6 max-w-md w-full flex flex-col items-center'>
        <img src={book.url} alt={book.title} className='h-80 w-full object-cover rounded-md mb-4' />
        <h2 className='text-3xl font-bold mb-2'>{book.title}</h2>
        <p className='text-lg mb-1'>by {book.author}</p>
        <p className='text-lg font-semibold mb-2'>${book.price}</p>
        <p className='text-sm mb-2'>{book.language}</p>
        <p className='text-sm'>{book.desc}</p>
      </div>
        </BlurFade>
    </div>
  );
}

export default ViewBookDetails;
