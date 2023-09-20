const Product = require("../models/productModel");
const User = require("../models/userModel");

const addToWishlist = async (req, res) => {
    const { productId } = req.body

    try {
        const user = await User.findById(req.user._id);

        if (user.wishlists.includes(productId)) {
            return res.status(400).json({ error: "Product is already in the wishlist" })
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product Not Found" });
        }

        user.wishlists.push(productId);
        await user.save();

        res.status(200).json({ message: "Product added to wishlist successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addToWishlist };
