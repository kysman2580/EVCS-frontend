import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const AdminRoute = () => {
  const { auth } = useAuth();

  if (!auth.user.isAuthenticated || auth.user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
