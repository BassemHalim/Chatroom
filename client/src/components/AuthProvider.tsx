import React, { createContext, useState, useContext } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  username: "",
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  if (token && !isAuthenticated) {
    const { exp } = parseJwt(token);
    if (Date.now() / 1000 < exp) {
      setIsAuthenticated(true);
    } else {
      setToken(null);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const baseURL = import.meta.env.VITE_BACKEND_BASEURL;
      const response = await axios.post(baseURL + ":8080/auth/login", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const { token, username } = response.data;
        setIsAuthenticated(true);
        setToken(token);
        setUsername(username);

        localStorage.setItem("token", token);
        localStorage.setItem("username", username); // TODO: create api instead of storing username
      } else {
        alert("invalid credentials");
      }
    } catch (error) {
      console.log(error);
      alert("invalid credentials");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const baseURL = import.meta.env.VITE_BACKEND_BASEURL;
      const response = await axios.post(baseURL + ":8080/auth/signup", {
        email: email,
        username: username,
        password: password,
      });
      if (response.status === 200) {
        const { token, username } = response.data;
        setIsAuthenticated(true);
        setToken(token);
        setUsername(username);
        console.log(AuthContext);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, username, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export default AuthProvider;
