import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // Initialize cart as an empty array
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      const userId = user._id; // Access the user ID directly from the user context
      const token = user.token;

      const response = await axios.post(
        `http://localhost:4000/api/users/${userId}/cart/${productId}`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Fetch the complete product details and add them to the wishlist
        const productDetailsResponse = await axios.get(
          `http://localhost:4000/api/products/${productId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (productDetailsResponse.status === 200) {
          const updatedCart = [...cart, productDetailsResponse.data];
          setCart(updatedCart);

          //Update localStorage with new cart data
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          navigate(`/cart/${userId}`)
          console.log("Product added to cart");
        } else {
          console.error(
            "Error Fetching Product Details. Response:",
            productDetailsResponse
          );
        }
      } else {
        console.error("Error Adding Product To Wishlist. Response:", response);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const userId = user._id;
      const token = user.token;

      const response = await axios.delete(
        `http://localhost:4000/api/users/${userId}/cart/${productId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the cart state with the updated data
        const updatedCart = cart.filter((item) => item._id !== productId);
        setCart(updatedCart);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        console.error("Error removing product from cart. Response:", response);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
