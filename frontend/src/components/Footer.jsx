import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div id="footer-logo"></div>
      <div id="footer-links">
        <div>
          <h2>Shop</h2>
          <ul>
            <li>High Jewelry</li>
            <li>Fine Jewelry</li>
            <li>Haut Couture</li>
            <li>Runway</li>
          </ul>
        </div>
        <div>
          <h2>About</h2>
          <ul>
            <li>Affiliates & Creators</li>
            <li>Sell on Aurea</li>
            <li>Teams</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h2>Online Services</h2>
          <ul>
            <li>Payment Methods</li>
            <li>Shipping Options</li>
            <li>My Account</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h2>Help</h2>
          <ul>
            <li>Privacy settings</li>
            <li>Help centre</li>
            <li>Privacy</li>
            <li>Policies</li>
          </ul>
        </div>
      </div>
      <div id="footer-copywrite">copyright©2023 Aurea - All right reserved</div>
    </footer>
  );
};
