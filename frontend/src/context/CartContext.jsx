import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // Initialize cart as an empty array
  const [cartProducts, setCartProducts] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const userId = user._id;
        const token = user.token;
        const response = await axios.get(
          `http://localhost:4000/api/users/${userId}/cart/products`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Set the wishlist state with the fetched data
          setCart(response.data.cart);
          setCartProducts(response.data.products);
        } else {
          console.error("Error fetching cart. Response:", response);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (user) {
      // Fetch the wishlist when the user is available
      fetchCartProducts();
    }
  }, [user]);

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
        // Update the cart state with the response data if successful
        setCart([...cart, productId]);
        console.log("Product added to cart");
      } else {
        console.log("NOOOO");
        console.error("Error adding product to cart. Response:", response);
      }
    } catch (error) {
      console.log("NOPE");
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
