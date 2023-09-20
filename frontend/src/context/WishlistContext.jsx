import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);


  useEffect(() => {

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/wishlist`, {

        });

        if (response.status === 200) {
          setWishlist(response.data.wishlist);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []); 

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/users/wishlist/add`,
        { productId },
      );

      if (response.status === 200) {

        setWishlist([...wishlist, productId]);
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/users/wishlist/remove`,
        { productId },


      );

      if (response.status === 200) {

        setWishlist(wishlist.filter((item) => item !== productId));
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
