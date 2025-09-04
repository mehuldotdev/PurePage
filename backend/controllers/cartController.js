import dotenv from "dotenv"
import User from "../models/user.js";
import Book from "../models/books.js";
dotenv.config();

export const addToCart = async(req, res) => {
    try {
        const {id} = req.user;
        const {bookId} = req.body;

        const user = await User.findById(id);

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        const book = await Book.findById(bookId)

        if(!book){
         return res.status(400).json({message: "Book not found"})
        }

        if(user.cart.includes(bookId)){
            return res.status(400).json({message: "Book already in cart"})
        }

        user.cart.push(bookId)
        await user.save();

        res.status(200).json({message: "Book has been added to cart", cart: user.cart})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

export const removeFromCart = async(req, res) => {
    try {
        const {id} = req.user;
        const {bookId} = req.params;

        const user = await User.findById(id);

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        const book = await Book.findById(bookId)

        if(!book){
         return res.status(400).json({message: "Book not found"})
        }

        const updatedUser = await User.findByIdAndUpdate(id, {$pull: {cart: bookId}},
            { new:true }
        )

        res.status(200).json({message: "Book removed from cart", cart: updatedUser.cart})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

export const getCart = async(req,res) => {
    try {
        const {id} = req.user;
        const user = await User.findById(id);
    
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
    
        res.status(200).json({message: "User cart has been fetched", cart: user.cart})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }

}