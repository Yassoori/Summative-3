const Comment = require("../models/commentModel");
const Product = require("../models/productModel");

// Create a new comment
const createComment = async (req, res) => {
  // Id of product to create comment on
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newComment = new Comment({
      text: req.body.text,
      user_id: req.body.user_id,
    });

    await newComment.save();

    product.comments.push(newComment);
    await product.save();

    res.status(201).json(newComment);
    console.log("post function is working");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Edit an existing comment
const editComment = async (req, res) => {
  const { productId, commentId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        text: req.body.text,
      },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a comment and remove its reference from the product
const deleteComment = async (req, res) => {
  const { productId, commentId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const comment = await Comment.findByIdAndRemove(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Remove the comment reference from the product
    product.comments = product.comments.filter(
      (comment) => comment.toString() !== commentId
    );

    await product.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createComment, editComment, deleteComment };
