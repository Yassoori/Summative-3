import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const userData = localStorage.getItem("user");

  if (userData) {
    onClose();
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login-modal" onSubmit={handleLoginSubmit}>
      <div className="login">
        <h3>Log In</h3>
        <div>
          <label>email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="login-confirm" disabled={isLoading}>
          Log In
        </button>
        {error && <div className="login-error">{error}</div>}
      </div>
    </form>
  );
};

export default Login;
