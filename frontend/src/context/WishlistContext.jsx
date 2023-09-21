import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuthContext();

  const addToWishlist = async (productId) => {
    try {
      const userId = user._id;
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
          const updatedWishlist = [...wishlist, productDetailsResponse.data];
          setWishlist(updatedWishlist);

          // Update localStorage with the new wishlist data
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

          console.log("Product added to wishlist");
        } else {
          console.error(
            "Error fetching product details. Response:",
            productDetailsResponse
          );
        }
      } else {
        console.error("Error adding product to wishlist. Response:", response);
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const userId = user._id;
      const token = user.token;

      const response = await axios.delete(
        `http://localhost:4000/api/users/${userId}/wishlist/${productId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the wishlist state with the updated data
        const updatedWishlist = wishlist.filter(
          (item) => item._id !== productId
        );
        setWishlist(updatedWishlist);

        // Update localStorage with the updated wishlist data
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      } else {
        console.error(
          "Error removing product from wishlist. Response:",
          response
        );
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  // Load wishlist data from localStorage when the component mounts
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
