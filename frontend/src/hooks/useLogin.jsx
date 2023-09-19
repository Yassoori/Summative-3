import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    //API call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // end of url

      // if the response is not OK, set Error
      if (response.status !== 200) {
        setIsLoading(false);
        setError(error.response.data.error);
      }

      // if the response is OK
      if (response.status === 200) {
        // save the user local storage data type as string
        localStorage.setItem("user", JSON.stringify(response.data));

        // update the authContext
        dispatch({ type: "LOGIN", payload: response.data });

        //enalble the button
        setIsLoading(false);

      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };
  // end of login

  //return function, isLoading state, error state
  return { login, isLoading, error };
};
