const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  addToWishlist,
  fetchWishlist,
} = require("../controllers/userController");

// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);

// Add to Wishlist
router.post("/:userId/wishlist/:productId", addToWishlist);
router.get("/:userId/wishlist/products", fetchWishlist);
module.exports = router;
