const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    subCategory: {
        type: [String],
        required: true
    }

})

module.exports = mongoose.model("Category", categorySchema)