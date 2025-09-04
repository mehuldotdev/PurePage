import dotenv from "dotenv"
dotenv.config();
import User from "../models/user.js"
import Book from "../models/books.js"


export const addFavourite = async(req,res) => {
    try {
        
        const {id} = req.user;
        const {bookId} = req.params;

        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        const book = await Book.findById(bookId)
        if(!book){
            return res.status(400).json({message: "Book does not exist"});
        }

        if(user.favourites.includes(bookId)){
            return res.status(400).json({message: "Book already added to favourites"});
        }

        user.favourites.push(bookId);
        await user.save();

        res.status(200).json({message: "Book added to favourites", favourites: user.favourites})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

export const deleteFavourite = async(req,res) => {
    try {
        
        const {id} = req.user;
        const {bookId} = req.params;

        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({message: "User does not exist"})
        }

        const book = await Book.findById(bookId)
        if(!book){
            return res.status(400).json({message: "Book does not exist"})
        }

        const updatedUser = await User.findByIdAndUpdate(id, 
            { $pull: {favourites: bookId}},
            {new: true}
        );

        res.status(200).json({message: "Book removed from favourites", favourites: updatedUser.favourites})


    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

export const showAll = async(req,res) => {
    try {

        const {id} = req.user;
        const user = await User.findById(id).populate("favourites");

        if(!user){
            return res.status(400).json({mesage: "User does not exist"})
        }

        res.status(200).json({message: "Favourites fetched successfully", favourites: user.favourites})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}