import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // Get the removeFromCart function from useCart
  const { cart, removeFromCart } = useCart();

  useEffect(() => {
    if (user) {
      const storedUserDetails = JSON.parse(localStorage.getItem("user"));
      if (storedUserDetails) {
        setUserDetails(storedUserDetails);
        setLoading(false);
      }
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

  if (!cart || !cart.length) {
    return <div>Your cart is empty.</div>;
  }

  // Define a function to handle removal of a product from the cart
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <>
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-heading">Cart</div>
          <div className="cart">
            <ul>
              {cart.map((product) => (
                <li key={product._id} className="list-item-product">
                  <img src={product.image[0]} className="list-image"></img>
                  <div className="list-text">
                    {/* <p className="list-creator">{product.creator}</p> */}
                    <Link to={`/product/${product._id}`} key={product._id}>
                      <p className="list-title">{product.title}</p>
                    </Link>
                    <p className="list-price">${product.price.toLocaleString()}</p>
                  </div>
                  <div className="list-buttons">
                    <a className="edit-button">Edit</a>
                    <a
                      className="remove-button"
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      Remove
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="payment-section">
        <div className="payment-section-heading">Payment</div>
        <form>
          <div className="form-sections">
            <label className="payment-form-label">Card number</label>
            <input className="payment-form-input" type="text" />
          </div>

          <div className="form-sections">
            <label className="payment-form-label">Expiry date</label>
            <input className="payment-form-input" type="text" />
          </div>

          <div className="form-sections">
            <label className="payment-form-label">CCV</label>
            <input className="payment-form-input" type="number" />
          </div>

          <div className="form-sections">
            <label className="payment-form-label">Name on card</label>
            <input className="payment-form-input" type="text" />
          </div>

          <div className="form-sections">
            <label className="payment-form-label">
              Optional - email my receipt{" "}
            </label>
            <input className="payment-form-input" type="text" />
          </div>

          <div className="button-container">
            <button className="paynow">Paynow</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Cart;
