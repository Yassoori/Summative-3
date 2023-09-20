import React from "react";
import { useState } from "react";
import { useIcons } from "../context/IconContext";
import { useWishlist } from "../context/wishlistContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const icons = useIcons();
  const [isHovered, setIsHovered] = useState(false);
  // const [isInWishlist, setIsInWishlist] = useState(wishlist.includes(product));

  console.log("Wishlist:", wishlist);
  console.log("Product:", product);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // const handleHeartClick = () => {
  //   if (isInWishlist) {
  //     removeFromWishlist(product);
  //   } else {
  //     addToWishlist(product);
  //   }
  //   setIsInWishlist(!isInWishlist);
  // };

  return (
    <div
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <React.Suspense fallback={<div>Loading Icons...</div>}>
        {/* {isInWishlist ? (
          <icons.HeartFilledIcon
            className="heart-icon"
            onClick={handleHeartClick}
          />
        ) : (
          <icons.HeartIcon className="heart-icon" onClick={handleHeartClick} />
        )} */}
      </React.Suspense>
      <Link to={`/product/${product._id}`} key={product._id}>
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
          <div className="product-price">${product.price} Tax incl.</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
