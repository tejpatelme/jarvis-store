import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("user")) ? true : false);
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const signUp = async (email, password) => {
    try {
      const {
        data: { _id: cartId },
      } = await axios.post("https://api-jarvis-store.herokuapp.com/cart");
      const {
        data: { _id: wishlistId },
      } = await axios.post("https://api-jarvis-store.herokuapp.com/wishlist");
      const { data, status } = await axios.post(
        "https://api-jarvis-store.herokuapp.com/user/signup",
        {
          email,
          password,
          cartId,
          wishlistId,
        }
      );
      console.log(data, status);
      if (status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setIsLoggedIn(true);
        return status;
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const login = async (email, password) => {
    try {
      const {
        data: { user },
        status,
      } = await axios.post(
        "https://api-jarvis-store.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );
      if (status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsLoggedIn(true);
        return { user, status };
      }
    } catch (err) {
      const {
        data: { errorMessage },
        status,
      } = err.response;
      return { errorMessage, status };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
