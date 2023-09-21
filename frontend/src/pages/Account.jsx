import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWishlist } from "../context/WishlistContext";
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
                <li key={product._id} className="list-item-product">
                  <img src={product.image[0]} className="list-image"></img>
                  <div className="list-text">
                    <p className="list-creator">{product.creator}</p>
                    <Link to={`/product/${product._id}`} key={product._id}>
                      <p className="list-title">{product.title}</p>
                    </Link>
                    <p className="list-price">${product.price}</p>
                  </div>
                  <div className="list-buttons">
                    <a className="edit-button">Edit</a>
                    <a className="remove-button">Remove</a>
                  </div>
                </li>
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
