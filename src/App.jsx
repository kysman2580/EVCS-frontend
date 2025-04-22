import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/UserInterface/Common/Header/GlobalStyle";
import AdminMain from "./components/AdminInterface/Main/AdminMain";
import Main from "./components/UserInterface/Main/Main";

/* 드라이빙 루뜨 관련 */
import DRBoard from "./components/UserInterface/Board/DriverRoute/DriveRouteBoard/drBoard";
/* 누스 관련 */
import NewsMain from "./components/UserInterface/News/NewsMain/NewsMain";
import NewsDetail from "./components/UserInterface/News/NewsDetail/NewsDetail";

/* 충전소 위치 관련 */
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";

/* 신고 관련 */
import IntegratedReportingPage from "./components/UserInterface/Report/IntegratedReportingPage";
import Report from "./components/UserInterface/Report/Report";

/* 게시판 페이지 관련 */
import UserNotice from "./components/UserInterface/Board/Notice/UserNotice";
import AdminNotice from "./components/AdminInterface/Board/Notice/Notice";
import NoticeDetail from "./components/AdminInterface/Board/Notice/NoticeDetail";

/* 회원관련 */
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";

/* 렌트카 관련 */
import LongTermRentCarDetail from "./components/UserInterface/RentCar/LongTermRentCar/LongTermRentCarDetail";
import InsertCar from "./components/AdminInterface/RentCar/CarManagement/InsertCar";
import CarManagement from "./components/AdminInterface/RentCar/CarManagement/CarManagement";
import SubscribeRentCar from "./components/UserInterface/RentCar/SubscribeRentCar/SubscribeRentCar";
import LongTermRentCar from "./components/UserInterface/RentCar/LongTermRentCar/LongTermRentCar";
import HotdealRentCar from "./components/UserInterface/RentCar/HotdealRentCar/HotdealRentCar";
import RentalPage from "./components/UserInterface/RentCar/TimeRentCar/RentalPage";
import TimeRentCar from "./components/AdminInterface/RentCar/TimeRentCar/TimeRentCar";
import AdminLongTermRentCar from "./components/AdminInterface/RentCar/LongTermRentCar/AdminLongTermRentCar";
import AdminRentCarEnrollPage from "./components/AdminInterface/RentCar/LongTermRentCar/AdminRentCarEnrollPage";
import AdminRentCarUpdatePage from "./components/AdminInterface/RentCar/LongTermRentCar/AdminRentCarUpdatePage";

/* User, Admin Interce 분리 관련 */
import UserLayout from "./components/Layout/UserInterface/UserLayout";
import AdminLayout from "./components/Layout/AdminInterface/AdminLayout";
import { AuthProvider } from "./components/UserInterface/Context/AuthContext/AuthContext";
import AdminRoute from "./components/UserInterface/Common/AdminRoute/AdminRoute";

function App() {
  const currentUser = "홍길동";
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
            <Route path="/loginPage" element={<LoginPage />} />

            {/* 드라이빙 루뜨 관련 */}
            <Route path="/driveRouteBoard" element={<DRBoard />}></Route>

            {/* 충전소 위치 관련 */}
            <Route path="/chargingMap" element={<ChargingMap />}></Route>

            {/* 게시판 페이지 관련 */}
            <Route path="/notice" element={<UserNotice />}></Route>

            {/* 회원관련 */}
            <Route path="/loginPage" element={<LoginPage />} />

            {/* 신고 관련 */}
            <Route
              path="/report"
              element={
                <Report useDummyData={true} currentUser={currentUser}></Report>
              }
            ></Route>
            <Route
              path="/reportingPage"
              element={<IntegratedReportingPage />}
            ></Route>

            {/* 누스 관련 */}
            <Route path="/newsMain" element={<NewsMain />}></Route>
            <Route path="/newsDetail" element={<NewsDetail />}></Route>

            {/* 렌트카 관련 */}
            <Route path="/hotRentCar" element={<HotdealRentCar />}></Route>
            <Route path="/subRentCar" element={<SubscribeRentCar />}></Route>
            <Route
              path="/LongTermRentDetail"
              element={<LongTermRentCarDetail />}
            ></Route>
            <Route path="/longRentCar" element={<LongTermRentCar />}></Route>
            <Route path="/timerentalPage" element={<RentalPage />}></Route>
          </Route>

          {/* 아래부터는 관리자페이지만 적자 */}
          {/* Admin 페이지에서 보내는 url 은 /admin/뒤에 URL 이런식으로 보내야함. EX) /admin/insertCar  */}
          {/* Admin Interface */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="main" element={<AdminMain />}></Route>

              {/* 렌트카 관련 */}
              <Route path="timeCar" element={<TimeRentCar />}></Route>
              <Route path="insertCar" element={<InsertCar />}></Route>
              <Route path="carManagement" element={<CarManagement />}></Route>
              <Route
                path="/admin/adminLongTermRentCar"
                element={<AdminLongTermRentCar />}
              ></Route>
              <Route
                path="/admin/rentCarEnrollPage"
                element={<AdminRentCarEnrollPage />}
              ></Route>
              <Route
                path="/admin/goUpdateRentCarPage/*"
                element={<AdminRentCarUpdatePage />}
              ></Route>

              {/* 게시판 페이지 관련 */}
              <Route path="notice" element={<AdminNotice />} />
              <Route path="notice/:id" element={<NoticeDetail />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
