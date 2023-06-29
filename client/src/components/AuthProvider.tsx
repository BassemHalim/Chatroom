import React, { createContext, useState, useContext } from "react";
import axios from "axios";
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  username: "",
  login: () => Promise.resolve(),
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
      console.log("token valid");
      setIsAuthenticated(true);
    } else {
      setToken(null);
    }
  }

  const login = async (username: string, password: string) => {
    // Perform authentication logic
    console.log(username, password);
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: username,
        password: password,
      });
      if (response.status === 200) {
        const { token, username } = response.data;
        console.log(token);
        setIsAuthenticated(true);
        setToken(token);
        setUsername(username);

        localStorage.setItem("token", token);
        localStorage.setItem("username", username); // TODO: create api instead of storing username
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, username, login, logout }}
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
