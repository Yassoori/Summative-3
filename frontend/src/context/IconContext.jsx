import React, { createContext, useContext } from "react";

const IconContext = createContext();

export function IconContextProvider({ children }) {
  const icons = {
    SearchIcon: React.lazy(() =>
      import("react-icons/ri").then((module) => ({
        default: module.RiSearch2Line,
      }))
    ),
    ShoppingCartIcon: React.lazy(() =>
      import("react-icons/fi").then((module) => ({
        default: module.FiShoppingCart,
      }))
    ),
    HeartIcon: React.lazy(() =>
      import("react-icons/ai").then((module) => ({
        default: module.AiOutlineHeart,
      }))
    ),
  };

  return <IconContext.Provider value={icons}>{children}</IconContext.Provider>;
}

export function useIcons() {
  return useContext(IconContext);
}
