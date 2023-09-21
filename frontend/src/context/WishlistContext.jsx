import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const userId = user._id;
        const token = user.token;

        const response = await axios.get(
          `http://localhost:4000/api/users/${userId}/wishlist/products`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Set the wishlist state with the fetched data
          setWishlist(response.data.wishlist);
          setWishlistProducts(response.data.products);
        } else {
          console.error("Error fetching wishlist. Response:", response);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (user) {
      // Fetch the wishlist when the user is available
      fetchWishlistProducts();
    }
  }, [user]);

  const addToWishlist = async (productId) => {
    try {
      const userId = user._id; // Access the user ID directly from the user context
      const token = user.token;

      const response = await axios.post(
        `http://localhost:4000/api/users/${userId}/wishlist/${productId}`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Update the wishlist state with the response data if successful
        setWishlist([...wishlist, productId]);
        console.log("Product added to wishlist");
      } else {
        console.error("Error adding product to wishlist. Response:", response);
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
