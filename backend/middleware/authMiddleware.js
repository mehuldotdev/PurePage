import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {

    const JWT_SECRET = process.env.JWT_SECRET;

    console.log("JWT_SECRET being used to verify:", JWT_SECRET);


    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    console.log("Decoded token:", decoded);


    next();
  } catch (error) {
    console.log(error.message);
    
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
