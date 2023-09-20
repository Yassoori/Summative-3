import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import VendorAccount from "../components/VendorAccount"; // Import the VendorAccount component

const Account = () => {
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="account-container">
      <div className="account-name">Hey, {user.username}!</div>
      {/* Only render VendorAccount if the user is a vendor */}
      {user.isvendor === "true" ? (
        <VendorAccount />
      ) : (
        <div className="regular-account-container">
          <div className="wishlist-heading">Wishlist</div>
        </div>
      )}
    </div>
  );
};

export default Account;
