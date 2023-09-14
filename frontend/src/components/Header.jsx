import React from "react";
import { Link } from "react-router-dom";

// import context hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useLoginModalContext } from "../hooks/useLoginModalContext";
// will probably need a useSignupModalContext also

const Header = () => {
  // bring user through useAuthContext
  const { user } = useAuthContext();
  const { logout } = useLogout();
  // take the dispatch function from context
  const { dispatch } = useLoginModalContext();

  // use the dispatch action to open login modal
  const handleLoginModalClick = () => {
    dispatch({ type: "LOGIN_OPEN" });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div id="header">
      <nav>
        <div className="nav-shop">
        <Link to="/shop/all">
          <h2 className="nav-text-link">Shop</h2>
        </Link>
        </div>
        <div className="nav-logo">
        <Link to="/">
          <h1 className="nav-text-link" id="logo">
            Aurea
          </h1>
        </Link>
        </div>
        <div className="nav-icons">
          <div id="account-icon" className="nav-icon">
            <div id="account-dropdown">
              {user && (
                <div>
                  <Link to="/account">Account</Link>
                  <button onClick={handleLogout}>Logout</button>
                  <Link>
                   <i class="bi bi-heart">cart</i>
                  </Link>
                  <Link>
                    <i class="bi bi-cart">heart</i>
                  </Link>
                </div>
              )}
              {!user && (
                <div>
                  <button onClick={handleLoginModalClick}>Login</button>
                  {/* <button onClick={handleSignupModalClick}>Signup</button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
