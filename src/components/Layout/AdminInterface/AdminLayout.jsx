import { Outlet } from "react-router-dom";
import Header from "../../UserInterface/Common/Header/Header";
import Footer from "../../UserInterface/Common/Footer/Footer";
export default function AdminLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
