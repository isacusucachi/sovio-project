import { Navigate, Outlet } from "react-router"; // Asegúrate de importar desde "react-router-dom"
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <Loader />;

  // Verificar si el usuario está autenticado y existe
  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  // Verificar si el usuario tiene el rol adecuado
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
