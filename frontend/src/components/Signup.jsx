import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
// import context hook
// import { useLoginModalContext } from "../hooks/useLoginModalContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // set default isvendor to false
  const [isvendor, setIsvendor] = useState("false");

  // bring in signup function, loading state, error from our hook:
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, password, isvendor);
  };

  // // take the dispatch function from context
  // const { dispatch } = useLoginModalContext();

  // // use the dispatch action to open login modal
  // const handleLoginModalClick = () => {
  //   dispatch({ type: "LOGIN_OPEN" });
  // };

  // This is literally just HTML now

  // const Signup = () => {
  return (
    <div className="signup">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div>
          <label className="username-label">Username</label>
          <input
            type="username"
            className="username-input"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label className="email-label">Email</label>
          <input
            type="email"
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label className="password-label">Password</label>
          <input
            type="password"
            className="password-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {/* a Buyer or Seller switch that makes isvendor true or false */}
        {/* should be styled a lot more, idk how to do toggle switches */}
        <div>
          {/* <form
            className="isvendor-radio-form"
            onChange={(e) => setIsvendor(e.target.checked)}
          > */}
          <input
            type="radio"
            className="isvendor-input"
            id="vendor-input"
            name="fav_language"
            onChange={(e) => setIsvendor(e.target.value)}
            value={true}
          />
          <label htmlFor="vendor-input">Vendor</label>
          <input
            type="radio"
            className="isvendor-input"
            id="customer-input"
            name="fav_language"
            onChange={(e) => setIsvendor(e.target.value)}
            value={false}
          />
          <label htmlFor="customer-input">Customer</label>
          {/* </form> */}

          {/* <label className="isvendor-switch-label">
            <input
              className="isvendor-switch-input"
              type="checkbox"
              checked={true}
              onChange={(e) => setIsvendor(e.target.checked)}
            />
            <span className="slider"></span>
          </label> */}
        </div>
        <button className="signup-btn" disabled={isLoading}>
          Sign Up
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
