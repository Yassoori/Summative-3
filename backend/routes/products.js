const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Define a route for handling the file uploads
app.post("/upload", upload.array("pictures", 2), (req, res) => {
  try {
    const files = req.files;
    const fileDetails = files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));
    return res
      .status(201)
      .json({ message: "files uploaded successfully", files: fileDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error" });
  }
});

// import controller
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
// GET ALL PRODUCTS
router.get("/", getProducts);
// GET A SINGLE PRODUCT
router.get("/:id", getProduct);
// CREATE A PRODUCT AND UPLOAD IMAGES
router.post("/", upload.array("images", 5), createProduct);
// DELETE A PRODUCT
router.delete("/:id", deleteProduct);
// UPDATE A PRODUCT
router.patch("/:id", updateProduct);

module.exports = router;
