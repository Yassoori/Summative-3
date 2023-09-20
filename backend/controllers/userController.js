// import userModel
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Product = require("../models/productModel");

// create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    // call upon our custom login method
    const user = await User.login(email, password, username);

    // create token
    const token = createToken({ _id: user._id });

    // Return username, email, isvendor, and token
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email,
      isvendor: user.isvendor,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { username, email, password, isvendor } = req.body;

  // signup user
  try {
    // call upon the custom signup static method defined in the user model
    const user = await User.signup(username, email, password, isvendor);

    // create token
    const token = createToken({ _id: user._id });

    // return the username and newly created user
    res.status(200).json({ _id: user._id, username, email, isvendor, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const addToWishlist = async (req, res) => {
//   try {
//     // const user = await User.findById(req.user._id);
//     const user = await User.findById("650a4f824be3ca7effb2afb7");

//     // Check if the user exists
//     if (!user) {
//       console.log(user);
//       return res.status(404).json({ error: "User not found" });
//     } else {
//       console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSS");
//     }

//     const { productId } = req.params;

//     // Check if the product with the given ID exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Check if the product is already in the user's wishlist
//     if (user.wishlist.includes(productId)) {
//       return res
//         .status(400)
//         .json({ error: "Product is already in the wishlist" });
//     }

//     // Create a new Wishlist entry
//     const newProductWishlist = new Wishlist({
//       user: req.userId,
//       product: productId,
//     });

//     await newProductWishlist.save();

//     // Add the product ID to the user's wishlist
//     user.wishlist.push(productId);
//     await user.save();

//     // Populate the product field to include product details in the response
//     await newProductWishlist.populate("product").execPopulate();

//     res.status(201).json(newProductWishlist);

//     console.log("Product added to wishlist");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };
// const addToWishlist = async (req, res) => {
//   try {
//     // const user = await User.findById(req.user._id);
//     const user = await User.findById(`650a98348b3624455a467af3`);

//     // Check if the user exists
//     if (!user) {
//       console.log(user);
//       return res.status(404).json({ error: "User not found" });
//     } else {
//       console.log("YES");
//     }

//     const productId = "650a137afab57f32998dbdcd";

//     // Check if the product with the given ID exists
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     } else {
//       console.log("Product found:", product);
//     }

//     // Check if the product is already in the user's wishlist
//     // if (user.wishlist.includes(productId)) {
//     //   return res
//     //     .status(400)
//     //     .json({ error: "Product is already in the wishlist" });
//     // }

//     // Create a new Wishlist entry
//     const newProductWishlist = {
//       user: req.userId,
//       product: productId,
//     };

//     await newProductWishlist.save();

//     // Add the product ID to the user's wishlist
//     user.wishlist.push(productId);
//     await user.save();

//     // Populate the product field to include product details in the response
//     await newProductWishlist.populate("product").execPopulate();

//     res.status(201).json(newProductWishlist);

//     console.log("Product added to wishlist");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    // Extract the token from the Authorization header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    // Decode the JWT token to access user data
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken || !decodedToken._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = decodedToken._id;
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product with the given ID exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product is already in the user's wishlist
    if (user.wishlists.includes(productId)) {
      return res
        .status(400)
        .json({ error: "Product is already in the wishlist" });
    }

    // Add the product's ObjectId to the user's wishlists array
    user.wishlists.push(productId);
    await user.save();

    res.status(201).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const fetchWishlist = async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const { userId } = req.params;

    // Fetch the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the user's wishlist based on their wishlists array
    const wishlistItems = await Product.find({ _id: { $in: user.wishlists } });

    // Send the wishlist items in the response
    res.status(200).json({ wishlist: wishlistItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { signupUser, loginUser, addToWishlist, fetchWishlist };
