import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { db } from "./config/db/db.js";
import authRoutes from "./routes/auth.js"
import bookRoutes from "./routes/book.js"
import favouriteRoutes from "./routes/favourite.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/order.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7000;

db();

// Enable CORS for all routes
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req,res) => {
    return res.send("Working port")
})

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))

export default app