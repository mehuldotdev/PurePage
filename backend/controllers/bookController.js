import dotenv from "dotenv"
dotenv.config();
import Book from "../models/books.js";
import User from "../models/user.js";

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
