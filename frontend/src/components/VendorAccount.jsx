import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiSelectDropdown from "./MultiSelectDropdown"; // Make sure to import the component correctly
import { productsReducer, useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const VendorAccount = () => {
  // Form inputs state variables
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const { products, deleteProduct } = useProducts();

  // Function to handle product deletion
  const handleProductDelete = (productId) => {
    deleteProduct(productId);
  };

  const handleMaterialChange = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user._id;
    console.log(user_id);
    console.log("selected images", images);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("materials", selectedMaterials.join(", ")); // Combine selected materials into a single string
    formData.append("description", description);
    formData.append("creator", user_id);

    images.forEach((imageFile) => {
      formData.append("images", imageFile);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTitle("");
      setPrice("");
      setCategory("");
      setSelectedMaterials([]);
      setDescription("");
      setImages([]);
      setError(null);

      if (response.status === 200) {
        console.log("New Product added", response.data);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Server Response Data:", error.response.data);
        console.error("Server Response Status:", error.response.status);
      }

      setError("An error occurred while submitting the form.");
    }
  };

  const { state, fetchProducts } = useProducts();
  const vendorId = JSON.parse(localStorage.getItem("user"))._id;
  const vendorProducts = state.products.filter(
    (product) => product.creator === vendorId
  );

  // Function to fetch vendor products
  const fetchVendorProducts = async () => {
    fetchProducts("all"); // Fetch all products
  };

  // Use useEffect to fetch the vendor's products when the component mounts
  useEffect(() => {
    fetchVendorProducts();
    console.log("VENDOR PRODUCTS ALL:", vendorProducts);
  }, []);

  const renderVendorProducts = () => {
    return (
      <div className="vendor-products">
        <div className="account-section-heading">Your Products</div>
        <ul>
          {vendorProducts.map((product) => (
            <li key={product._id} className="list-item-product">
              <img
                src={product.image[0]}
                className="list-image"
                alt={product.title}
              />
              <div className="list-text">
                {/* <p className="list-creator">{product.creator}</p> */}
                <Link to={`/product/${product._id}`} key={product._id}>
                  <p className="list-title">{product.title}</p>
                </Link>
                <p className="list-price">${product.price}</p>
              </div>
              <div className="list-buttons">
                {/* <a className="edit-button">Edit</a> */}
                <a
                  className="remove-button"
                  onClick={() => handleProductDelete(product._id)}
                >
                  Remove
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderVendorComments = () => {
    return (
      <div className="vendor-comments">
        <div className="account-section-heading">Comments</div>
        {vendorProducts.map((product) => (
          <div key={product._id}>
            <p className="comments-products-heading">{product.title}</p>
            <ul className="comment-list">
              {product.comments.map((comment) => (
                <li key={comment._id} className="list-item-comment">
                  <div className="list-text">
                    <p className="comment-user">{comment.user_id} commented:</p>
                    <p className="comment-text">{comment.text}</p>
                    <span>
                      posted:
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        includeSeconds: true,
                      })}{" "}
                      ago
                    </span>
                  </div>
                  <div className="list-buttons">
                    <Link
                      to={`/product/${product._id}`}
                      key={product._id}
                      className="view-comment"
                    >
                      View Details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  // Define your material options
  const materialOptions = [
    "Gold",
    "Silver",
    "Platinum",
    "Diamond",
    "Emerald",
    "Sapphire",
    "Opal",
    "Pearl",
    "Semi-Precious Gemstones",
  ];
  // Other Options could be:
  //"Amethyst", "Lapis Lazuli", "Topaz", "Peridot", "Zircon", "Quartz", "Garnet", "Aquamarine", "Citrine", "Apatite"

  return (
    <div className="vendor-container">
      {renderVendorProducts()}
      {renderVendorComments()}
      <div className="add-product-section">
        <div className="account-section-heading">Add a New Product</div>
        <form className="add-product" onSubmit={handleSubmit}>
          <div className="form-sections">
            <label className="product-form-label">Product Name</label>
            <input
              className="product-form-input"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="form-sections">
            <label className="product-form-label">Categories</label>
            <select
              className="product-form-input"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="" disabled hidden></option>
              <option value="ring">Ring</option>
              <option value="necklace">Necklace</option>
              <option value="bracelet">Bracelet</option>
              <option value="earring">Earring</option>
            </select>
          </div>

          <div className="form-sections">
            <label className="product-form-label">Materials</label>
            <MultiSelectDropdown
              className="product-form-input"
              options={materialOptions}
              selectedItems={selectedMaterials}
              onChange={handleMaterialChange}
            />
          </div>

          <div className="form-sections">
            <label className="product-form-label">Price</label>
            <input
              className="product-form-input"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div className="form-sections">
            <label className="product-form-label">Description</label>
            <textarea
              className="product-form-input"
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="file-upload form sections">
            <label className="upload-photos">Upload Photos</label>
            <input
              className="product-form-input"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                setImages([...e.target.files]);
                console.log(images);
              }}
            />
          </div>
          <div className="button-container">
            <button className="product-submit">Submit</button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default VendorAccount;
