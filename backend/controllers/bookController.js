import dotenv from "dotenv"
dotenv.config();
import Book from "../models/books.js";
// Creating the book

export const addBook = async (req,res) => {
    try {
        const {id} = req.user;
        const user = await User.findById(id);

        if(user.role!=="admin"){
            return res.status(400).json({message: "Admin operations can't be performed"})
        }
        

        const book = new Book({
            url: req.body.url,
            desc: req.body.desc,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            language: req.body.language,
        })

        await book.save()

        res.status(200).json({message: "Book listed successfully."})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

// Updating the book

export const updateBook = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin operations can't be performed" });
    }

    const { bookId } = req.params; // get book id from URL

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        url: req.body.url,
        desc: req.body.desc,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        language: req.body.language,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Deleting the book

export const deleteBook = async (req,res) => {
    try {
        const {id} = req.user;
        const user = await User.findById(id);
    
        if(user.role!=="admin" || !user){
            return res.status(403).json({ message: "Admin operations can't be performed" });
        }
    
        const {bookId} = req.params;
    
        const deletedBook = await Book.findByIdAndDelete(bookId)
    
        if(!deletedBook){
            return res.status(400).json({message: "Book not found"})
        }
    
        return res.status(200).json({message: "Book deleted successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }

}

// Fetch all books

export const getBooks = async (req,res) => {
    try {

        const books = await Book.find().sort({createdAt: -1});
        res.status(200).json({
            message: "All books shown",
            books: books
        })

    } catch (error) {

      console.log(error);
      res.status(500).json({message: error.message})   

    }
}

// Fetch book as per id

export const getBookById = async(req,res) => {
    try {
      
        const {bookId} = req.params

        const book = await Book.findById(bookId);

        if(!book){
            return res.json(400).json({message: "Book not found!"})
        }

        res.status(200).json(book)

    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message}) 
    }
}