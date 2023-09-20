const express = require("express");
const router = express.Router();
const { addToWishlist } = require("../controllers/wishListController")

// import controller functions
const { signupUser, loginUser } = require("../controllers/userController");

// login
router.post("/login", loginUser);
router.get("/", () => {
  console.log("get");
});

// signup
router.post("/signup", signupUser);

router.post("/wishlist/add", addToWishlist )

module.exports = router;
