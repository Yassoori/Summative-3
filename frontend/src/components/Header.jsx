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

  // useState definitions for input:
  const [searchTerm, setSearchTerm] = useState("");

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
        <Link to="/shop">
          <h2 className="nav-text-link">Shop</h2>
        </Link>
        <Link to="/about">
          <h2 className="nav-text-link">About</h2>
        </Link>
        <Link to="/">
          <h1 className="nav-text-link" id="logo">
            Aurea
          </h1>
        </Link>
        <div className="nav-icons">
          <form id="search-bar">
            <input
              type="text"
              placeholder="Search"
              //   value={searchTerm}
              //   onChange={handleSearchTermChange}
            />
            <button id="search-bar-btn">Search</button>
          </form>
          <div id="search-icon" className="nav-icon"></div>
          <div id="account-icon" className="nav-icon">
            <div id="account-dropdown">
              <Link to="/account">Account</Link>
              {user && (
                <div>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
              {!user && (
                <div>
                  <button onClick={handleLoginModalClick}>Login</button>
                  <Link to="/signup">Sign Up</Link>
                  {/* <button onClick={handleSignupModalClick}>Signup</button> */}
                </div>
              )}
            </div>
            <Link>
              <img id="wishlist-icon" className="nav-icon"></img>
            </Link>
            <Link>
              <img id="cart-icon" className="nav-icon"></img>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
