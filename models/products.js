const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    prices: {
        type: Array,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Products', productsSchema);
