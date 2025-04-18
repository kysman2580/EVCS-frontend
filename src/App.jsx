import { Routes, Route } from "react-router-dom";
import AdminMain from "./components/AdminInterface/Main/AdminMain";
import Main from "./components/UserInterface/Main/Main";
import TimeRentCar from "./components/AdminInterface/RentCar/TimeRentCar/TimeRentCar";
import RentalPage from "./components/UserInterface/RentCar/TimeRentCar/RentalPage";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";
import HotdealRentCar from "./components/UserInterface/RentCar/HotdealRentCar/HotdealRentCar";
import LongTermRentCar from "./components/UserInterface/RentCar/LongTermRentCar/LongTermRentCar";
import SubscribeRentCar from "./components/UserInterface/RentCar/SubscribeRentCar/SubscribeRentCar";
import IntegratedReportingPage from "./components/UserInterface/Report/IntegratedReportingPage";
import GlobalStyle from "./components/UserInterface/Common/Header/GlobalStyle";
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";
import Notice from "./components/UserInterface/Board/Notice/Notice";
import NewsMain from "./components/UserInterface/News/NewsMain/NewsMain";
import NewsDetail from "./components/UserInterface/News/NewsDetail/NewsDetail";
import CarManagement from "./components/AdminInterface/RentCar/CarManagement/CarManagement";
import InsertCar from "./components/AdminInterface/RentCar/CarManagement/InsertCar";
import DRBoard from "./components/UserInterface/Board/DriverRoute/DriveRouteBoard/drBoard";

/* User, Admin Interce 분리 관련 */
import UserLayout from "./components/Layout/UserInterface/UserLayout";
import AdminLayout from "./components/Layout/AdminInterface/AdminLayout";
import DRInsertBoard from "./components/UserInterface/Board/DriverRoute/DriveRouteInsertBoard/DRInsertBoard";
import LongTermRentCarDetail from "./components/UserInterface/RentCar/LongTermRentCar/LongTermRentCarDetail";
import { AuthProvider } from "./components/UserInterface/Context/AuthContext/AuthContext";
import AdminRoute from "./components/UserInterface/Common/AdminRoute/AdminRoute";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          {/* User Interface */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Main />}></Route>
            <Route path="/timerentalPage" element={<RentalPage />}></Route>

            <Route path="/driveRouteBoard" element={<DRBoard />}></Route>
            <Route
              path="/driveRouteInsertBoard"
              element={<DRInsertBoard />}
            ></Route>

            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="/chargingMap" element={<ChargingMap />}></Route>
            <Route path="/notice" element={<Notice />}></Route>
            <Route path="/longRentCar" element={<LongTermRentCar />}></Route>
            <Route
              path="/LongTermRentDetail"
              element={<LongTermRentCarDetail />}
            ></Route>
            <Route path="/hotRentCar" element={<HotdealRentCar />}></Route>
            <Route path="/subRentCar" element={<SubscribeRentCar />}></Route>
            <Route path="/newsMain" element={<NewsMain />}></Route>
            <Route path="/newsDetail" element={<NewsDetail />}></Route>
            <Route
              path="/reportingPage"
              element={<IntegratedReportingPage />}
            ></Route>
          </Route>

          {/* 아래부터는 관리자페이지만 적자 */}
          {/* Admin 페이지에서 보내는 url 은 /admin/뒤에 URL 이런식으로 보내야함. EX) /admin/insertCar  */}
          {/* Admin Interface */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="main" element={<AdminMain />}></Route>
              <Route path="carManagement" element={<CarManagement />}></Route>
              <Route path="insertCar" element={<InsertCar />}></Route>
              <Route path="timeCar" element={<TimeRentCar />}></Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
