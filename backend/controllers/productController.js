//Product Model
const Product = require("../models/productModel");

const mongoose = require("mongoose");

// GET All Products
const getProducts = async (req, res) => {
  const { category } = req.query;
  console.log("Category:", category);
  // Define the filter based on the presence of the 'category' query parameter
  const filter = category ? { category } : {};

  try {
    const products = await Product.find(filter)
      .populate({
        path: "comments",
        model: "Comment",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// GET a single product
const getProduct = async (req, res) => {
  const { id } = req.params;

  // Check if id is MongoDB valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Product: Id is invalid" });
  }

  try {
    // Find the product by Id and populate the 'comment' array
    const product = await Product.findById(id).populate({
      path: "comments",
      model: "Comment",
    });

    // if no product, show an error
    if (!product) {
      return res
        .status(404)
        .json({ error: "No such Product: Product does not exist" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE a New Product
const createProduct = async (req, res) => {
  const { title, price, category, materials, description } = req.body;
  const userId = req.user_id;

  // Get the uploaded image filename from the req.file object
  const imageFilenames = req.files.map((file) => {
    return '/uploads/' + file.filename
  })

  try {
    const product = await Product.create({
      title,
      price,
      category,
      materials,
      description,
      image: imageFilenames,
      creator: userId,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Product" });
  }

  const product = await Product.findByIdAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ error: "No such Product" });
  }
  res.status(200).json(product);
};

// UPDATE product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Product" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(404).json({ error: "No such Product" });
  }

  res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
