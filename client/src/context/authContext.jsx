import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  verifyEmailRequest,
  verifyEmailTokenRequest,
} from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        window.sessionStorage.setItem("loggedUser", JSON.stringify(res.data));
        setUser(res.data);
        setIsAuthenticated(true);
      }
      return res;
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.status === 200) {
        window.sessionStorage.setItem("loggedUser", JSON.stringify(res.data));
        setUser(res.data);
        setIsAuthenticated(true);
      }
      return res;
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const verifyEmail = async (data) => {
    try {
      const res = await verifyEmailRequest(data);
      return res.data;
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const verifyEmailToken = async (data) => {
    try {
      const res = await verifyEmailTokenRequest(data);
      return res.data;
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const logout = async () => {
    window.sessionStorage.removeItem("loggedUser");
    localStorage.removeItem(`ieppoTestAnswers${user?.id}`);
    localStorage.removeItem(`phbTestAnswers${user?.id}`);
    localStorage.removeItem(`tepeTestAnswers${user?.id}`);
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      let token;
      const loggedUserJSON = window.sessionStorage.getItem("loggedUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        token = user.token;
      }
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        verifyEmail,
        verifyEmailToken,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
