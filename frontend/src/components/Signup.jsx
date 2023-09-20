import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

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

  // const Signup = () => {
  return (
    <div className="signup">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div>
          <input
            placeholder="Username"
            type="username"
            className="username-input"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            type="email"
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            className="password-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div id="radio-input">
          <input
            type="radio"
            className="isvendor-input"
            id="vendor-input"
            name="fav_language"
            onChange={(e) => setIsvendor(e.target.value)}
            value={"true"}
          />
          <label htmlFor="vendor-input">Vendor</label>
          <input
            type="radio"
            className="isvendor-input"
            id="customer-input"
            name="fav_language"
            onChange={(e) => setIsvendor(e.target.value)}
            value={"false"}
          />
          <label htmlFor="customer-input">Customer</label>
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
