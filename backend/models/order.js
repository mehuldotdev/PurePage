import mongoose, { mongo } from "mongoose";

const order = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId, ref:"User",
    },
    book:{
     type: mongoose.Types.ObjectId, ref:"Book",   
    },
    status:{
        type:String, default: "Order placed", enum:["Order placed", "Order out for delivery", "Order delivered", "Order cancelled"]
    }
}, {timestamps:true})

const Order = mongoose.model("Order", order)

export default Order