import { useReducer, createContext, useContext } from "react";

export const SignupModalContext = createContext();

// set the default
const initialState = {
  isSignupVisible: false,
};

// reducer is a function that holds state and the actions that change it
const reducer = (state, action) => {
  // basically an if statement
  switch (action.type) {
    case "SIGNUP_OPEN":
      return {
        ...state,
        isSignupVisible: true,
      };
    case "SIGNUP_CLOSE":
      return {
        ...state,
        isSignupVisible: false,
      };
  }
};

// export provider for main.jsx
export const SignupModalContextProvider = ({ children }) => {
  // declare state and dispatch as from the reducer above and the initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SignupModalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SignupModalContext.Provider>
  );
};

export function useSignup() {
  return useContext(SignupModalContext);
}
