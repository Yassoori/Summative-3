import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWishlist } from "../context/WishlistContext";
import VendorAccount from "../components/VendorAccount";
import { useLogout } from "../hooks/useLogout";

const Account = () => {
  const { user } = useAuthContext();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { logout } = useLogout();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  console.log("wishlist Items:", wishlist);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (user) {
      const storedUserDetails = JSON.parse(localStorage.getItem("user"));
      if (storedUserDetails) {
        setUserDetails(storedUserDetails);
      }
      setLoading(false);
    }
    console.log("Account component re-rendered");
  }, [user]);

  if (!user) {
    return <div>User Not Logged In.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>User Details Not Available.</div>;
  }

  const handleRemoveFromWishlist = async (productId) => {
    // Call removeFromWishlist when the button is clicked
    await removeFromWishlist(productId);
  };

  return (
    <div className="account-page">
      <div className="account-name">Hey, {user.username}!</div>
      {user.isvendor === "true" ? (
        <VendorAccount />
      ) : (
        <div className="regular-account-container">
          <div className="wishlist-heading">Wishlist</div>
          <div className="wishlist">
            <ul>
              {wishlist.map((product) => (
                <div className="wishlist-item" key={product._id}>
                  {product.image && product.image[0] && (
                    <img src={product.image[0]} alt={product.title} />
                  )}
                  <p>{product.creator}</p>
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => handleRemoveFromWishlist(product._id)}>
                    Remove From Wishlist
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Account;
