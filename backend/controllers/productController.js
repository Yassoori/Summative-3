//Product Model
const Product = require('../models/productModel')

const mongoose = require('mongoose')

// GET All Products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(products)
}

// GET a single product
const getProduct = async (req, res) => {
    const {id} = req.params

    // Check if id is MongoDB valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Product'})
    }

    // Find a product by its id
    const product = await Product.findById(id)

    // if no product, show an error
    if(!product) {
        return res.status(404).json({error: 'No such Product'})
    }

    // Otherwise return the product found
    res.status(200).json(product)
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

// DELETE a product
const deleteProduct = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Product'})
    }

    const product = await Product.findByIdAndDelete({_id: id})

    if(!product) {
        return res.status(404).json({error: 'No such Product'})
    }
    res.status(200).json(product)
}

// UPDATE product
const updateProduct = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Product'})
    }

    const product = await Product.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!product) {
        return res.status(404).json({error: 'No such Product'})
    }

    res.status(200).json(product)
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}
