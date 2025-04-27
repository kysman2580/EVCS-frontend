import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const AdminRoute = () => {
  const { auth } = useAuth();
  console.log("AdminRoute 상태:", auth);


  // if (!auth.user.isAuthenticated || auth.user.role !== "admin") {
  if (!auth.user || !auth.user.isAuthenticated) {
    console.log("관리자 권한이 없거나 인증되지 않았습니다.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
