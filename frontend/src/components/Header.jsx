import React from "react";
import { Link } from "react-router-dom";
import { useIcons } from "../context/IconContext";

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

  const icons = useIcons();

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
        {user && (
          <div className="nav-icons">
            <React.Suspense fallback={<div>Loading Icons...</div>}>
              <Link to={`/account/${user._id}`}>
                <icons.ProfileIcon />
              </Link>
              <Link to={`/cart/${user._id}`}>
                <icons.ShoppingCartIcon />
              </Link>
            </React.Suspense>
            {/* <button onClick={handleLogout}>Logout</button> */}
          </div>
        )}
        {!user && (
          // <div>
          //   <button onClick={handleLoginModalClick}>Login</button>
          // </div>
          <div className="nav-icons">
            <React.Suspense fallback={<div>Loading Icons...</div>}>
              <div onClick={handleLoginModalClick}>
                <icons.ProfileIcon />
              </div>
              <div onClick={handleLoginModalClick}>
                <icons.ShoppingCartIcon />
              </div>
            </React.Suspense>
            {/* <button onClick={handleLogout}>Logout</button> */}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
