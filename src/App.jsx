import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import TimeRentCar from "./components/AdminInterface/RentCar/TimeRentCar/TimeRentCar";
import RentalPage from "./components/UserInterface/RentCar/TimeRentCar/RentalPage";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";
import HotdealRentCar from "./components/UserInterface/RentCar/HotdealRentCar/HotdealRentCar";
import LongTermRentCar from "./components/UserInterface/RentCar/LongTermRentCar/LongTermRentCar";
import SubscribeRentCar from "./components/UserInterface/RentCar/SubscribeRentCar/SubscribeRentCar";
import IntegratedReportingPage from "./components/UserInterface/Report/IntegratedReportingPage";
import GlobalStyle from "./components/UserInterface/Common/Header/GlobalStyle";
import EventBoard from "./components/UserInterface/Board/Event/EventBoard";
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";
import Notice from "./components/UserInterface/Board/Notice/Notice";
import NoticeDetail from "./components/UserInterface/Board/Notice/NoticeDetail";
import NewsMain from "./components/UserInterface/News/NewsMain";
import CarManagement from "./components/AdminInterface/RentCar/CarManagement/CarManagement";
import InsertCar from "./components/AdminInterface/RentCar/CarManagement/InsertCar";
import DRBoard from "./components/UserInterface/Board/DriverRoute/DriveRouteBoard/drBoard";

/* User, Admin Interce 분리 관련 */
import UserLayout from "./components/Layout/UserInterface/UserLayout";
import AdminLayout from "./components/Layout/AdminInterface/AdminLayout";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        {/* User Interface */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/timerentalPage" element={<RentalPage />}></Route>
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/chargingMap" element={<ChargingMap />}></Route>
          <Route path="/notice" element={<Notice />}></Route>
          <Route path="/longRentCar" element={<LongTermRentCar />}></Route>
          <Route path="/hotRentCar" element={<HotdealRentCar />}></Route>
          <Route path="/subRentCar" element={<SubscribeRentCar />}></Route>
          <Route path="/newsMain" element={<NewsMain />}></Route>
          <Route
            path="/reportingPage"
            element={<IntegratedReportingPage />}
          ></Route>
        </Route>

        {/* 아래부터는 관리자페이지만 적자 */}

        {/* Admin 페이지에서 보내는 url 은 /admin/뒤에 URL 이런식으로 보내야함. EX) /admin/insertCar  */}
        {/* Admin Interface */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="/admin/CarManagement"
            element={<CarManagement />}
          ></Route>
          <Route path="/admin/InsertCar" element={<InsertCar />}></Route>
          <Route path="/admin/TimeCar" element={<TimeRentCar />}></Route>
          <Route path="/admin/notice/:id" element={<NoticeDetail />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
