import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers/bookController.js"


const router = express.Router()

router.post('/add-book', protect, addBook)

router.put('/update-book/:bookId', protect, updateBook)

router.delete('/delete-book:bookId', protect, deleteBook)

router.get('/getBooks', getBooks)

router.get('/:bookId', getBookById)

export default router