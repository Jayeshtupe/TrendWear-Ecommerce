const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            originalPrice: { type: Number, required: true },
            discountedPrice: { type: Number, required: true },
            imageUrl: { type: String, required: true }
        }
    ],
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Placed", "Shipped", "Delivered", "Cancelled"],
        default: "Placed"
    }
})
module.exports = mongoose.model("Order", orderSchema)