import React from "react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  // const [isHovered, setIsHovered] = useState(false);
  const [isInCart, setIsInCart] = useState(cart.includes(product));

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }

    setIsInCart(!isInCart);
  };

  const handleRemoveClick = () => {
    removeFromCart(product);
  };

  return (
    <div className="cart-page">
      {/* cart list should be almost identical to wishlist, but with add and remove buttons instead */}
      <div className="vendor-products">
        <div className="products-heading">Your Products</div>
        <ul>
          {vendorProducts.map((product) => (
            <li key={product._id}>
              <img src={product.image[0]}></img>
              <p>{product.title}</p>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
