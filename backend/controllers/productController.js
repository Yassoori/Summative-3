//Product Model
const Product = require("../models/productModel");

const mongoose = require("mongoose");

const {
  uploadToGoogleDrive,
} = require("../googleControllers/googleDriveUploader"); // Adjust the path to your file

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
    return res.status(404).json({ error: "No such Product: Id invalid" });
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
  const { title, price, category, materials, description, creator } = req.body;

  if (!req.files || !Array.isArray(req.files)) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  try {
    // Upload each image to Google Drive and collect their web view links
    const imageLinks = [];
    for (const file of req.files) {
      const webViewLink = await uploadToGoogleDrive(file.path, file.filename);
      if (webViewLink) {
        imageLinks.push(webViewLink);
      }
    }

    // Check if any images failed to upload
    if (imageLinks.length !== req.files.length) {
      return res
        .status(500)
        .json({ error: "Error uploading some images to Google Drive" });
    }

    // Create the product with the Google Drive web view links
    const product = await Product.create({
      title,
      price,
      category,
      materials,
      description,
      image: imageLinks, // Use the web view links
      creator,
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

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "No such Product" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
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
