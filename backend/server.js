import express from "express"
import dotenv from "dotenv"
import { db } from "./config/db/db.js";
import authRoutes from "./routes/auth.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7000;

db();

app.use(express.urlencoded({ extended: false }));

app.use(express.json())

app.use("/api/auth", authRoutes);

app.get("/", (req,res) => {
    return res.send("Working port")

})

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))

export default app