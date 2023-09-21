import { useAuthContext } from "./useAuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    //remove user in localstorage
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return { logout };
};
