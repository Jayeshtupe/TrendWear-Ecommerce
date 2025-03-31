const mongoose = require("mongoose")

    const wishListSchema = new mongoose.Schema({
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
        quantity: {
            type: Number,
            default: 1
        },
        rating: {
            type: Number,
            default: 0
        },
        size: {
            type: String,
            required: true
           },
        discount: {
            type: Number,
        }
    }, { timestamps: true}
    )

    module.exports = mongoose.model("WishList", wishListSchema)