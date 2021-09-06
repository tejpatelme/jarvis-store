import { createContext, useContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import API from "../services/api/api-urls";
import { useToast } from "./";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { token: userToken } = JSON.parse(localStorage.getItem("login")) || {
    token: null,
  };

  const [userLogin, setUserLogin] = useState({
    isLoggedIn: userToken ? true : false,
    token: userToken,
  });
  const { postData: signUpUser } = useAxios(API.SIGN_UP);
  const { postData: logInUser } = useAxios(API.LOGIN);
  const { dispatch } = useToast();

  const setupHeaderForServiceCalls = () => {
    if (userLogin.isLoggedIn && userLogin.token) {
      return (axios.defaults.headers.common["Authorization"] = userLogin.token);
    }

    delete axios.defaults.headers.common["Authorization"];
  };

  setupHeaderForServiceCalls();

  const signUp = async (email, password) => {
    const data = await signUpUser({ email, password });

    if (data?.success) {
      dispatch({
        type: "SUCCESS",
        payload: { message: "Sign up successful, please login to continue" },
      });
    }

    return data?.success;
  };

  const login = async (email, password) => {
    const data = await logInUser({ email, password });

    if (data?.success) {
      setUserLogin({ isLoggedIn: true, token: data.token });
      localStorage.setItem("login", JSON.stringify({ token: data.token }));

      dispatch({
        type: "SUCCESS",
        payload: { message: "Login Successful" },
      });
    }

    return data?.success;
  };

  const logout = () => {
    localStorage.removeItem("login");
    setUserLogin({ isLoggedIn: false, token: null });
  };

  return (
    <AuthContext.Provider value={{ userLogin, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
