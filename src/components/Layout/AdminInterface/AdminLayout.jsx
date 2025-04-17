import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminInterface/Common/AdminHeader"; // 관리자용 헤더
import Footer from "../components/UserInterface/Common/Footer/Footer"; // 혹은 관리자엔 푸터 없애도 되고

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <Footer />
    </>
  );
}
