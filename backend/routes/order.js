import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getAllOrders, getOrderDetails, placeOrder, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post('/place-order', protect, placeOrder)
router.get('/my-orders', protect, getOrderDetails)
router.get('/admin/orders', protect, getAllOrders)
router.put('/update-order:orderId', protect, updateOrderStatus)

export default router;