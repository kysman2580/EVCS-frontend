import { Outlet } from "react-router-dom";
import Header from "../../UserInterface/Common/Header/Header";
import Footer from "../../UserInterface/Common/Footer/Footer";

export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* 여기서 각 페이지 컴포넌트가 렌더링됨 */}
      <Footer />
    </>
  );
}
