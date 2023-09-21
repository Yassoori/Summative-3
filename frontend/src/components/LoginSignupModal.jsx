import { useState } from "react";
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
      <div className="login-signup-wrapper">
        <div className="login-signup-modal">
          <ImCancelCircle
            className="cancel-login"
            onClick={handleCancelClick}
          />
          <Signup></Signup>
          <p className="register-text">
            Already have an account?
            <br />
            <br />
            <a
              onClick={(e) => setLoginOrSignup("Login")}
              className="login-signup-switch"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    ) : (
      <div className="login-signup-wrapper">
        <div className="login-signup-modal">
          <ImCancelCircle
            className="cancel-login"
            onClick={handleCancelClick}
          />
          <Login></Login>
          <p className="register-text">
            Don't have an account?
            <br />
            <br />
            <a
              onClick={(e) => setLoginOrSignup("Signup")}
              className="login-signup-switch"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    )
  ) : null;
};

export default LoginSignup;
