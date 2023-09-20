import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiSelectDropdown from "./MultiSelectDropdown"; // Make sure to import the component correctly
import { productsReducer, useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

const VendorAccount = () => {
  // Form inputs state variables
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

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
  }, []);

  const renderVendorProducts = () => {
    return (
      <div className="vendor-products">
        <div className="products-heading">Your Products</div>
        <ul>
          {vendorProducts.map((product) => (
            <li key={product._id}>
              <img src={product.image[0]} className="list-image"></img>
              <div className="list-text">
                <p className="list-creator">{product.creator}</p>
                <p className="list-title">{product.title}</p>
                <p className="list-price">${product.price}</p>
              </div>
              <div className="list-buttons">
                <button className="edit-button">Edit</button>
                <button className="remove-button">Remove</button>
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
        <div className="comments-heading">Comments</div>
        {vendorProducts.map((product) => (
          <div key={product._id}>
            <p>Comments for: {product.title}</p>
            <ul>
              {product.comments.map((comment) => (
                <li key={comment._id}>
                  <p>{comment.text}</p>
                  <Link to={`/product/${product._id}`} key={product._id}>
                    <p>View Details</p>
                  </Link>
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
      <form className="add-product" onSubmit={handleSubmit}>
        <h3>Add a new product</h3>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div>
          <label>Categories</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="" disabled hidden>
              Select a category
            </option>
            <option value="ring">Ring</option>
            <option value="necklace">Necklace</option>
            <option value="bracelet">Bracelet</option>
            <option value="earring">Earring</option>
          </select>
        </div>

        <div>
          <label>Materials</label>
          <MultiSelectDropdown
            options={materialOptions}
            selectedItems={selectedMaterials}
            onChange={handleMaterialChange}
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="file-upload">
          <label>Upload Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              setImages([...e.target.files]);
              console.log(images);
            }}
          />
        </div>

        <button className="product-submit">Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default VendorAccount;
