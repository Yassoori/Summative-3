const express = require('express')

const router = express.Router()

// import controller
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController')

// GET all products
router.get('/', getProducts)

// GET a single product
router.get('/:id', getProduct)

// POST products
router.post('/', createProduct)

// DELETE products
router.delete('/:id', deleteProduct)

// UPDATE product
router.patch('/:id', updateProduct)

module.exports = router