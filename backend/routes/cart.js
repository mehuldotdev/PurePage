import express from "express";
import { protect } from "../middleware/authMiddleware.js"
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post('/add-to-cart', protect, addToCart)

router.delete('/remove-from-cart/:bookId', protect, removeFromCart)

router.get('/', protect, getCart)

export default router