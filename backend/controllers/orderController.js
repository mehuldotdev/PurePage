import User from "../models/user.js"
import Order from "../models/order.js"

export const placeOrder = async(req,res) => {

    try {
        
        const {id} = req.user;
        const user = await User.findById(id).populate("cart")

        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        if(!user.cart || user.cart.length === 0){
            return res.status(400).json({message: "Cart is empty"})
        }

        // Looping on items placed in cart to create orders

        const orders = []
        for(const book of user.cart){
            const order = new Order({
                user: id,
                book: book._id,
                status: "Order placed"
            });
            await order.save();
            orders.push(order)
        }

        // After placing the order, removing items from cart

        user.cart = []
        await user.save();

        res.status(200).json({message: "Order placed successfully", orders})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }

}

export const getOrderDetails = async(req,res) => {
    try {

        const {id} = req.user;

        const orders = await Order.find({user : id}).populate("book").sort({createdAt : -1})

        if(!orders || orders.length===0){
            return res.status(400).json({message: "No orders found"})
        }

        res.status(200).json({message: "Orders fetched successfully", orders})

    } catch (error) {
     console.log(error);
        res.status(500).json({message: "Server error"});   
    }
}

//Admin commands

export const getAllOrders = async(req,res) => {
    try {
        
        if(req.user.role !== "admin"){
            return res.status(403).json({message:"Not authorized"})
        }

        const orders = await Order.find().populate("user", "name email")
        .populate("book", "title author price")

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"}); 
    }
}

export const updateOrderStatus = async(req,res) => {
    try {
        
        if(req.user.role !== "admin"){
            return res.status(403).json({message: "Not authorized"})
        }

        const {orderId} = req.params;
        const {status} = req.body

        const validOptions = [
            "Order placed",
            "Order out for delivery",
            "Order delivered",
            "Order cancelled",
        ];

        if(!validOptions.includes(status)){
            return res.status(400).json({message: "Invalid status value"})
        }

        

        const order = await Order.findByIdAndUpdate(
            orderId,
            {status},
            {new: true}
        ).populate("user", "name email")
        .populate("book", "title author price")

        if(!order){
            return res.status(404).json({message: "Order not found"})
        }

        res.status(200).json({message: "Order status updated", order})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"}); 
    }
}