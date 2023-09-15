import React from "react";
import { useIcons } from "../context/IconContext";

const ProductCard = ({ product }) => {
  const icons = useIcons();

  return (
    <div className="product-grid">
      <div className="product-card">
        <React.Suspense fallback={<div>Loading Icons...</div>}>
          <icons.HeartIcon className="heart-icon" />
        </React.Suspense>
        <div className="image-container">
          {product.image.map((image, index) => (
            <img
              key={index}
              className="product-image"
              src={`${image}`}
              alt={`Product Image ${index + 1}`}
            />
          ))}
        </div>
        <div className="product-name">{product.title}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-material">{product.materials}</div>
        <div className="product-price">${product.price} Tax incl.</div>
      </div>
    </div>
  );
};

export default ProductCard;
