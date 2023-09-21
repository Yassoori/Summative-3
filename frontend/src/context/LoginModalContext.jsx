import { useReducer, createContext } from "react";

export const LoginModalContext = createContext();

// set the default
const initialState = {
  isLoginVisible: false,
};

// reducer is a function that holds state and the actions that change it
const reducer = (state, action) => {
  // basically an if statement
  switch (action.type) {
    case "LOGIN_OPEN":
      return {
        ...state,
        isLoginVisible: true,
      };
    case "LOGIN_CLOSE":
      return {
        ...state,
        isLoginVisible: false,
      };
    case "SIGNUP_CLOSE":
      return {
        ...state,
        isLoginVisible: false,
      };
  }
};

// export provider for main.jsx
export const LoginModalContextProvider = ({ children }) => {
  // declare state and dispatch as from the reducer above and the initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoginModalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LoginModalContext.Provider>
  );
};
