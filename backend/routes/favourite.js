import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addFavourite, deleteFavourite, showAll } from "../controllers/favourite.js";

const router = express.Router()

router.post('/:bookId', protect, addFavourite)

router.delete('/delete/:bookId', protect, deleteFavourite)

router.get('/showall', protect, showAll)

export default router;