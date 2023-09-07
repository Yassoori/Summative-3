import { useContext } from "react";
import { LoginModalContext } from "../context/LoginModalContext";

// custom hook
export const useLoginModalContext = () => {
  const context = useContext(LoginModalContext);

  // error check - make sure context is avaliable
  // make sure we are using the LoginModalContext inside of LoginModalContext.Provider
  if (!context) {
    throw Error(
      "useLoginModalContext must be used inside of LoginModalContextProvider"
    );
  }

  return context;
};
