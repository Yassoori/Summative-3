const express = require('express')
const router = express.Router()
const {
    createComment,
    editComment,
    deleteComment
} = require('../controllers/commentController')

// Create a new comment for a specific product
router.post('/products/:productId/comments', createComment)

// Edit and existing comment
router.patch('/products/:productId/comments/:commentId', editComment)

// Delete a comment
router.delete('/products/:productId/comments/:commentId', deleteComment)

module.exports = router
