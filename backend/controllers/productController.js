//Product Model
const Product = require('../models/productModel')

const mongoose = require('mongoose')

// GET All Products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(products)
}

// CREATE a New Product
const createProduct = async (req, res) => {
    const {title, price, category, materials, description} = req.body
    
    try {
        const product = await Product.create({title, price, category, materials, description})
        res.status(200).json(product)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getProducts,
    createProduct
}
