import React from "react";
import { useState } from "react";
import { useIcons } from "../context/IconContext";

const ProductCard = ({ product }) => {
  const icons = useIcons();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    // <div className="product-grid">
    <div
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <React.Suspense fallback={<div>Loading Icons...</div>}>
        <icons.HeartIcon className="heart-icon" />
      </React.Suspense>
      <div className="image-container">
        <img
          className="product-image"
          src={`${isHovered ? product.image[1] : product.image[0]}`}
          alt={`Product Image`}
        />
      </div>
      <div className="text-container">
        <div className="product-name">{product.title}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-material">{product.materials}</div>
        <div className="product-price">${product.price}</div>
      </div>
    </div>
    // </div>
  );
};

export default ProductCard;
