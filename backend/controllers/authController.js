import dotenv from "dotenv"
dotenv.config();
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_for_development";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30d";

export const signup = async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length <= 4) {
            return res.status(400).json({ message: "Username length should be more than 4" })
        }

        const exisitingUsername = await User.findOne({ username })

        if (exisitingUsername) {
            return res.status(400).json({ message: "Username already exists" })
        }

        const existingEmail = await User.findOne({ email })

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be more than 5" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username: username, email: email, password: hashedPassword, address: address });

        await user.save();

        res.status(200).json({ message: "User created successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(!existingUser) { 
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        console.log("JWT_SECRET being used to sign:", JWT_SECRET);

        const token = jwt.sign(
            { id: existingUser.id, role: existingUser.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );


        res.json({ 
            message: "Login successful", 
            _id: existingUser.id, 
            role: existingUser.role, 
            token 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getUserDetails = async(req,res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const updateAddress = async(req,res) => {
    try {

        const {address} = req.body

        if(!address || address.trim().length === 0){
            return res.status(400).json({message: "Address can't be empty"});
        }

        const user = await User.findByIdAndUpdate(req.user.id,
            {address},
            {new: true, runValidators: true}
        ).select("-password")

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.json({message: "Address has been updated", user})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
}