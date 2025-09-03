import express from "express";
import { getUserDetails, login, signup, updateAddress } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/sign-up', signup);

router.post('/login', login);

router.get('/details', protect, getUserDetails)

router.post('/update-address', protect, updateAddress)

export default router;