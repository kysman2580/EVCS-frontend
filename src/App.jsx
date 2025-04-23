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
import IntegratedReportingPage from "./components/UserInterface/Report/IntegratedReportingPage/IntegratedReportingPage";
import Report from "./components/UserInterface/Report/Report/Report";
import AdminReport from "./components/AdminInterface/Report/AdminReport";
import ReportDetail from "./components/UserInterface/Report/ReportDetail/ReportDetail";

/* 게시판 페이지 관련 */
import UserNotice from "./components/UserInterface/Board/Notice/UserNotice";
import AdminNotice from "./components/AdminInterface/Board/Notice/Notice";
import NoticeDetail from "./components/AdminInterface/Board/Notice/NoticeDetail";
import NoticeWrite from "./components/AdminInterface/Board/Notice/NoticeWrite";
import EventBoard from "./components/UserInterface/Board/Event/EventBoard";
import EventBoardDetail from "./components/UserInterface/Board/Event/EventBoardDetail";
import AdminEventBoard from "./components/AdminInterface/Board/Event/AdminEventBoard";
import AdminEventBoardDetail from "./components/AdminInterface/Board/Event/AdminEventBoardDetail";
import AdminEventBoardUpdateForm from "./components/AdminInterface/Board/Event/AdminEventBoardUpdateForm";
import AdminEventBoardEnrollForm from "./components/AdminInterface/Board/Event/AdminEventBoardEnrollForm";

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
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          {/* User Interface */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Main />}></Route>

            {/* 드라이빙 루뜨 관련 */}
            <Route path="/driveRouteBoard" element={<DRBoard />} />

            {/* 충전소 위치 관련 */}
            <Route path="/chargingMap" element={<ChargingMap />} />

            {/* 게시판 페이지 관련 */}
            <Route path="/notice" element={<UserNotice />} />
            <Route path="/eventBoard" element={<EventBoard />} />
            <Route path="/goEventDetailPage/*" element={<EventBoardDetail />} />
            <Route path="/timerentalPage" element={<RentalPage />}></Route>

            {/* 회원관련 */}
            <Route path="/loginPage" element={<LoginPage />} />

            {/* 신고 관련 */}
            <Route path="/report/*" element={<Report useDummyData={true} />} />
            <Route
              path="/reportingPage"
              element={<IntegratedReportingPage />}
            ></Route>
            <Route
              path="/reports/:boardNo"
              element={<ReportDetail useDummyData={true} />}
            />

            {/* 누스 관련 */}
            <Route path="/newsMain" element={<NewsMain />} />
            <Route path="/newsDetail" element={<NewsDetail />} />

            {/* 렌트카 관련 */}
            <Route path="/hotRentCar" element={<HotdealRentCar />} />
            <Route path="/subRentCar" element={<SubscribeRentCar />} />
            <Route
              path="/LongTermRentDetail"
              element={<LongTermRentCarDetail />}
            />
            <Route path="/longRentCar" element={<LongTermRentCar />} />
            <Route path="/timerentalPage" element={<RentalPage />} />
          </Route>

          {/* 아래부터는 관리자페이지만 적자 */}
          {/* Admin 페이지에서 보내는 url 은 /admin/뒤에 URL 이런식으로 보내야함. EX) /admin/insertCar  */}
          {/* Admin Interface */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="main" element={<AdminMain />} />

              {/* 렌트카 관련 */}
              <Route path="timeCar" element={<TimeRentCar />} />
              <Route path="insertCar" element={<InsertCar />} />
              <Route path="carManagement" element={<CarManagement />} />
              <Route
                path="/admin/adminLongTermRentCar"
                element={<AdminLongTermRentCar />}
              />
              <Route
                path="/admin/rentCarEnrollPage"
                element={<AdminRentCarEnrollPage />}
              />
              <Route
                path="/admin/goUpdateRentCarPage/*"
                element={<AdminRentCarUpdatePage />}
              />

              {/* 게시판 페이지 관련 */}
              <Route path="/admin/notice" element={<AdminNotice />} />
              <Route path="/admin/notice/:id" element={<NoticeDetail />} />
              <Route path="/admin/notice/write" element={<NoticeWrite />} />

              <Route path="adminEventBoard" element={<AdminEventBoard />} />
              <Route
                path="goAdminEventDetailPage"
                element={<AdminEventBoardDetail />}
              />
              <Route
                path="goAdminEventUpdateForm"
                element={<AdminEventBoardUpdateForm />}
              />
              <Route
                path="goAdminEventEnrollForm"
                element={<AdminEventBoardEnrollForm />}
              />
              {/* 신고 관련*/}
              <Route
                path="/admin/adminReport/*"
                element={<AdminReport useDummyData={true} />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
