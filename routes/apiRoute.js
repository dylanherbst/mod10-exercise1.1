
"use strict";
const express = require('express');
const axios = require('axios');
const router = express.Router();

let products = []; // In-memory array to store products

// Create (Populate products from API)
const apiProducts = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        const data = response.data;

        // Map the products and return them
        return data.products.map((productData, index) => ({
            id: index + 1,
            name: productData.title,
            desc: productData.description,
            img: productData.images[0],
            price: productData.price,
            stock: productData.stock
        }));
    } catch (error) {
        console.error(error);
        throw new Error('Error populating products');
    }
};

// Read (Get all products)
router.get('/', async (req, res) => {
    try {
        // Check if products array is empty and populate it if needed
        if (products.length === 0) {
            products = await apiProducts();
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read (Get a single product by ID)
router.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Update (Update a product by ID)
router.put('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        const updatedProduct = { ...products[index], ...req.body };
        products[index] = updatedProduct;
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Delete (Delete a product by ID)
router.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

router.get('/populate', apiProducts);

module.exports = router;
