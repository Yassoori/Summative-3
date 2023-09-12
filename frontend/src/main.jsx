import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { LoginModalContextProvider } from "./context/LoginModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <LoginModalContextProvider>
        <App />
      </LoginModalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
