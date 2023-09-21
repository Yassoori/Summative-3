import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart(); // Get addToCart function from your cart context

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // API call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If the response is not OK, set Error
      if (response.status !== 200) {
        setIsLoading(false);
        setError(response.data.error);
      }

      // If the response is OK
      if (response.status === 200) {
        // Save the user data to local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Update the authContext
        dispatch({ type: "LOGIN", payload: response.data });

        // Enable the button
        setIsLoading(false);

        // Add the user's wishlist data to local storage
        if (response.data.wishlist) {
          localStorage.setItem(
            "wishlist",
            JSON.stringify(response.data.wishlist)
          );
        }

        // Add the user's cart data to local storage
        if (response.data.cart) {
          localStorage.setItem("cart", JSON.stringify(response.data.cart));
        }

        // If there's a wishlist, add the items to the wishlist context
        if (response.data.wishlist && response.data.wishlist.length > 0) {
          response.data.wishlist.forEach((productId) => {
            addToWishlist(productId);
          });
        }

        // If there's a cart, add the items to the cart context
        if (response.data.cart && response.data.cart.length > 0) {
          response.data.cart.forEach((productId) => {
            addToCart(productId);
          });
        }
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  // Return function, isLoading state, error state
  return { login, isLoading, error };
};
