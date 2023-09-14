import { useState } from "react";
// import { useLogin } from "../hooks/useLogin";
// import { useSignup } from "../hooks/useSignup";
// react-icons
import { ImCancelCircle } from "react-icons/im";
import Signup from "./Signup";
import Login from "./Login";
import { useLoginModalContext } from "../hooks/useLoginModalContext";

const LoginSignup = ({ onClose }) => {
  const { isLoginVisible } = useLoginModalContext();

  const handleCancelClick = () => {
    onClose();
  };

  const [loginOrSignup, setLoginOrSignup] = useState("Login");

  return isLoginVisible ? (
    loginOrSignup === "Signup" ? (
      <div className="login-signup-modal">
        <ImCancelCircle className="cancel-login" onClick={handleCancelClick} />
        <Signup></Signup>
        <p className="register-text">
          Already have an account?{" "}
          <a onClick={(e) => setLoginOrSignup("Login")}>Log In</a>
        </p>
      </div>
    ) : (
      <div className="login-signup-modal">
        <ImCancelCircle className="cancel-login" onClick={handleCancelClick} />
        <Login></Login>
        <p className="register-text">
          Don't have an account?{" "}
          <a onClick={(e) => setLoginOrSignup("Signup")}>Signup</a>
        </p>
      </div>
    )
  ) : null;
};

export default LoginSignup;
