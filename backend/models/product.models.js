const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sizeAvailability: [String],
    rating: {
        type: Number,
        default: 0
    },
    originalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    discount: {
        type: Number,
    },
    discountedPrice: {
        type: Number,
        default: 0,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
    }
}, { timestamps: true}
)

module.exports = mongoose.model("Product", productSchema)