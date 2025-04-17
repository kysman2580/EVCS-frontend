import { Outlet } from "react-router-dom";
import AdminHeader from "../../AdminInterface/AdminCommon/AdminHeader/AdminHeader";
import Footer from "../../UserInterface/Common/Footer/Footer";
export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <Footer />
    </>
  );
}
