const express = require('express')

const router = express.Router()

// import controller
const {
    getProducts,
    createProduct
} = require('../controllers/productController')

// GET all products
router.get('/', getProducts)

// POST products
router.post('/', createProduct)

module.exports = router