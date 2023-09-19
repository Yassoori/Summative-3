import React, { useState } from "react";
import axios from "axios";
import MultiSelectDropdown from "./MultiSelectDropdown"; // Make sure to import the component correctly

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
    console.log("selected images", images);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("materials", selectedMaterials.join(", ")); // Combine selected materials into a single string
    formData.append("description", description);

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

  const materialOptions = ["Gold", "Silver", "Metal", "Stone"]; // Define your material options

  return (
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
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
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
  );
};

export default VendorAccount;
