import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Slab } from 'react-loading-indicators';
import useBookDetailsStore from '../../../store/viewBooks';
import { BlurFade } from '../magicui/blur-fade.jsx';
import { Globe } from 'lucide-react';

function ViewBookDetails() {
  const { bookId } = useParams();
  const { book, loading, error, fetchBookById, clearBook } = useBookDetailsStore();

  useEffect(() => {
    fetchBookById(bookId);
    return () => clearBook();
  }, [bookId]);

  if (loading)
    return (
      <div className="h-[100vh] flex items-center justify-center bg-secondary/50">
        <Slab text="Loading..." color={["#ccc331"]} style={{ fontSize: '24px' }} />
      </div>
    );

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!book) return <p className="text-gray-500">Book not found!</p>;

  return (
    <div className="min-h-[100vh] bg-secondary/50 py-12 px-4">
      <BlurFade direction="up" duration={1}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12">
          {/* Left image */}
          <div className="flex-shrink-0 hover:scale-105 transition-all duration-100">
            <img
              className="h-[60vh] w-auto rounded-xl border-2 shadow-xl object-cover"
              src={book.url}
              alt="book-img"
            />
          </div>

          {/* Right side */}
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold">{book.title}</h1>
            <p className="text-2xl text-black/60 font-semibold mb-8">by {book.author}</p>
            <p className="text-lg mb-6">{book.desc}</p>
            <p className='flex items-center gap-1 mb-6 text-black/60'><Globe size={18} />{book.language}</p>
            <p className="text-3xl font-bold">${book.price}</p>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

export default ViewBookDetails;
