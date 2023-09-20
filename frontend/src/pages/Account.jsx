import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWishlist } from "../context/wishlistContext";
import VendorAccount from "../components/VendorAccount"; // Import the VendorAccount component

import { useLogout } from "../hooks/useLogout";

const Account = () => {
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { wishlist } = useWishlist();
  console.log(wishlist);

  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };


  useEffect(() => {
    if (user) {
      const storedUserDetails = JSON.parse(localStorage.getItem("user"));
      if (storedUserDetails) {
        setUserDetails(storedUserDetails);
        setLoading(false);
      }
      console.log("user:", user);
      console.log("isvendor:", user.isvendor);
    }
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

  return (
    <div className="account-page">
      <div className="account-name">Hey, {user.username}!</div>
      {/* Only render VendorAccount if the user is a vendor */}
      {user.isvendor === "true" ? (
        <VendorAccount />
      ) : (
        <div className="regular-account-container">
          <div className="wishlist-heading">Wishlist</div>
          <div className="wishlist">
            <ul>
              {wishlist.map((product) => (
                <div className="wishlist-item">
                  <img src={product.image[0]}></img>
                  <p>{product.creator}</p>
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
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
