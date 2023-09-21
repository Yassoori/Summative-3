import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { user } = useAuthContext();
  const [ userDetails, setUserDetails ] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();

  useEffect(()=> {
    console.log(cart);
  },[cart])

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
    <div className="cart-page">
        <div className="cart-container">
          <div className="cart-heading">Cart</div>
          <div className="cart">
            <ul>
              {cart.map((product) => (
                <div className="cart-item">
                  <img src={product.image[0]}></img>
                  <p>{product.creator}</p>
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                </div>
              ))}
            </ul>
          </div>
        </div>
    </div>
  );
};

export default Cart;
