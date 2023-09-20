import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useLoginModalContext } from "../hooks/useLoginModalContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const userData = localStorage.getItem("user");
  const navigate = useNavigate();
  const { dispatch } = useLoginModalContext();

  if (userData) {
    dispatch({ type: "LOGIN_CLOSE" });
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Log In</h3>
        <div>
          <input
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="login-confirm" disabled={isLoading}>
          Log In
        </button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
