const express = require('express');
const router = express.Router();
const Products = require('../models/products');

router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.send(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/:id', getProducts, (req, res) => {
    res.send(res.product);
})

router.post('/:id', async (req, res) => {
    const product = new Products({
        title: req.body.title,
        prices: req.body.prices,
        url: req.body.url,
        imageUrl: req.body.imageUrl
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.patch('/:id', getProducts, async (req, res) => {
    if(req.body.title !== null) {
        res.product.title = req.body.title;
    }
    if(req.body.prices !== null) {
        res.product.prices = req.body.prices;
    }
    if(req.body.url !== null) {
        res.product.url = req.body.url;
    }
    if(req.body.imageUrl !== null) {
        res.product.imageUrl = req.body.imageUrl;
    }
    try {
        const updateProduct = await res.product.save();
        res.json(updateProduct)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.delete('/:id', getProducts, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

async function getProducts(req, res, next) {
    let product;
    try {
        product = await Products.findById(req.params.id);
        if (product === null) {
            return res.status(404).json({ message: 'Can not find product' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.product = product;
    next()
}

module.exports = router;