const mongoose = require("mongoose")

    const cartSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        originalPrice: {
            type: Number,
            required: true
        },
        discountedPrice: {
            type: Number,
            required: true
        },
       size: {
        type: String,
        required: true
       },
       quantity: {
        type: Number,
        default: 0
       },
       discount: {
        type: Number,
       }
    }, { timestamps: true}
    )

    module.exports = mongoose.model("Cart", cartSchema)