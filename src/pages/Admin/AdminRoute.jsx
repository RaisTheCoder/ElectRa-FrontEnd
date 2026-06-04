import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || !user.roles?.includes("Admin")) {
    return <Navigate to="/404" />;
  }

  return <Outlet />;
};

export default AdminRoute;
