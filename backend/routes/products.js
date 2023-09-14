const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'public/uploads')
  },
  filename: (req, file, cd) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cd(null, uniqueSuffix + ext)
  }
})

const upload = multer({ storage })

// Define a route for handling the file uploads
app.post('/upload', upload.array('pictures', 2), (req, res) => {
  const files = req.files

  res.send('Files uploaded successfully')
})

// import controller
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

// GET all products
router.get("/", getProducts);

// GET a single product
router.get("/:id", getProduct);

// POST products
router.post("/", createProduct);

// DELETE products
router.delete("/:id", deleteProduct);

// UPDATE product
router.patch("/:id", updateProduct);

module.exports = router;
