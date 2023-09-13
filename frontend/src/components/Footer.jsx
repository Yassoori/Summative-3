import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div id="footer-logo"><p>Aurea</p></div>
      <div id="footer-links">
        <div>
          <h2>Shop</h2>
          <ul>
            <li>Bracelets</li>
            <li>Earrings</li>
            <li>Rings</li>
            <li>Necklaces</li>
          </ul>
        </div>
        <div>
          <h2>About</h2>
          <ul>
            <li>Our story</li>
            <li>What Sets Us Apart</li>
            <li>Join Our Community</li>
          </ul>
        </div>
        <div>
          <h2>Account</h2>
          <ul>
            <li>Wish-list</li>
            <li>Cart</li>
            <li>My Account</li>
          </ul>
        </div>
      </div>
      <hr />
      <div id="footer-copywrite">copyright©2023 Aurea - All right reserved</div>
    </footer>
  );
};

export default Footer;
