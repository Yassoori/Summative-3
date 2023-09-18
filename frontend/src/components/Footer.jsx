import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div id="footer-logo">
        <p>Aurea</p>
      </div>
      <div id="footer-links">
        <div>
          <Link to="/shop">
            <h2>Shop</h2>
          </Link>
          <ul>
            <Link to="/shop/bracelet">
              <li>Bracelets</li>
            </Link>
            <Link to="/shop/earring">
              <li>Earrings</li>
            </Link>
            <Link to="/shop/ring">
              <li>Rings</li>
            </Link>
            <Link to="/shop/necklace">
              <li>Necklaces</li>
            </Link>
          </ul>
        </div>
        <div>
          <Link to="/about">
            <h2>About</h2>
          </Link>
          <ul>
            <Link to="/about">
              <li>Our story</li>
            </Link>
            <Link to="/about">
              <li>What Sets Us Apart</li>
            </Link>
            <Link to="/about">
              <li>Join Our Community</li>
            </Link>
          </ul>
        </div>
        <div>
          <Link to="/account">
            <h2>Account</h2>
          </Link>
          <ul>
            <Link to="/account">
              <li>Wish-list</li>
            </Link>
            <Link to="/cart">
              <li>Cart</li>
            </Link>
            <Link to="/account">
              <li>My Account</li>
            </Link>
          </ul>
        </div>
      </div>
      <hr />
      <div id="footer-copywrite">copyright©2023 Aurea - All right reserved</div>
    </footer>
  );
};

export default Footer;
