import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${productId}`
        );
        if (response.status === 200) {
          setProduct(response.data);
          console.log(`Viewing Product ${productId}`, response.data);
        }
      } catch (error) {
        console.error(`Error fetching product details:`, error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return (
      <div>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="image-container">
        {product.image.map((image, index) => (
          <img
            key={index}
            className="detail-image"
            src={`${image}`}
            alt={`Product Image ${index + 1}`}
          />
        ))}
      </div>
      <div className="detail-name">{product.title}</div>
      <div className="detail-description">{product.description}</div>
      <div className="detail-material">{product.materials}</div>
      <div className="detail-price">${product.price} Tax incl.</div>
    </div>
  );
};

export default ProductDetails;
