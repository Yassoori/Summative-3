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
    <div>
      {/* cart list should be almost identical to wishlist, but with add and remove buttons instead */}
    </div>
  );
};

export default Cart;
