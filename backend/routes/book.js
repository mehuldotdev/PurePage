import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addBook } from "../controllers/bookController.js"


const router = express.Router()

router.post('/add-book', protect, addBook)

export default router