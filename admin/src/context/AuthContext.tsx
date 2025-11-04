import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, verifyTokenRequest } from "../services/auth";

interface User {
  id: string;
  username: string;
  fullname: string;
  role: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    user: { username: string; password: string },
    rememberMe: boolean,
    recaptchaToken: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  errors: string[];
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const login = async (
    userData: { username: string; password: string },
    rememberMe: boolean,
    recaptchaToken: string
  ) => {
    setLoading(true);
    try {
      const res = await loginRequest({ ...userData, recaptchaToken });

      if (res.status === 200) {
        const userDataWithToken = { ...res.data, token: res.data.token };

        if (rememberMe) {
          localStorage.setItem("loggedAdminUser", JSON.stringify(userDataWithToken));
        } else {
          sessionStorage.setItem("loggedAdminUser", JSON.stringify(userDataWithToken));
        }

        setUser(userDataWithToken);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      setErrors(error.response?.data?.message || ["Error de inicio de sesión"]);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedAdminUser");
    sessionStorage.removeItem("loggedAdminUser");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      let storedUser =
        sessionStorage.getItem("loggedAdminUser") ||
        localStorage.getItem("loggedAdminUser");

      if (!storedUser) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);

      try {
        const res = await verifyTokenRequest(); // Se envía el token para validación
        if (res.status === 200) {
          setIsAuthenticated(true);
          setUser(parsedUser);
        } else {
          logout(); // Eliminar la sesión si el token ya no es válido
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, errors, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
