import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

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

  // Add a conditional check for cart to avoid the error
  if (!cart || !cart.length) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-heading">Cart</div>
        <div className="cart">
          <ul>
            {cart.map((product) => (
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

      <div className="payment">
        <h3>Payment</h3>
        <ul className="form-sections">
          <li>Card number</li>
          <li>Expiry date</li>
          <li>CCV</li>
          <li>Name on card</li>
          <li>Optional - email my receipt </li>
        </ul>
        <button className="paynow">Pay now</button>
      </div>

    </div>
  );
};

export default Cart;
