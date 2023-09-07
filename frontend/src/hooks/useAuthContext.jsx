import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// custom hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // error check - make sure context is avaliable
  // making sure we are using the AuthContext inside of AuthContext.Provider
  if (!context) {
    throw Error("useAuthContext must be used inside of AuthContextProvider");
  }

  return context;
};
