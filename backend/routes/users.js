const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  addToWishlist,
  fetchWishlist,
  addToCart,
  fetchCart,
  removeFromWishlist,
  removeCart,
} = require("../controllers/userController");

// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);

// Add to Wishlist
router.post("/:userId/wishlist/:productId", addToWishlist);
router.get("/:userId/wishlist/products", fetchWishlist);

// Add to Cart
router.post("/:userId/cart/:productId", addToCart);
router.get("/:userId/cart/products", fetchCart);
router.delete("/:userId/cart/:productId", removeCart);
router.delete("/:userId/wishlist/:productId", removeFromWishlist);

module.exports = router;
