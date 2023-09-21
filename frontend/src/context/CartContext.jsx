import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]); // Store product details
  const { user } = useAuthContext(); // Get the user context data

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const userId = user._id;
        const token = user.token; // Assuming you store the token in the user object

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
        // Update the wishlist state with the response data if successful
        setCart([...cart, productId]);
        console.log("Product added to cart");
      } else {
        console.error("Error adding product to cart. Response:", response);
      }
    } catch (error) {
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
