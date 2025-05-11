import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/UserInterface/Common/Header/GlobalStyle";
import AdminMain from "./components/AdminInterface/Main/AdminMain";
import Main from "./components/UserInterface/Main/Main";

/* alert 대신 깔끔한 UX  */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* 드라이빙 루뜨 관련 */
import DRBoard from "./components/UserInterface/Board/DriverRoute/DriveRouteBoard/DRBoard";
/* 뉴스 관련 */
import NewsMain from "./components/UserInterface/News/NewsMain/NewsMain";
import NewsDetail from "./components/UserInterface/News/NewsDetail/NewsDetail";
import NewsList from "./components/UserInterface/News/NewsList/NewsList";
import MyNews from "./components/UserInterface/News/MyNews/MyNews";
import AdminNews from "./components/AdminInterface/News/NewsAdminPage";

/* 충전소 위치 관련 */
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";

/* 신고 관련 */
import IntegratedReportingPage from "./components/UserInterface/Report/IntegratedReportingPage/IntegratedReportingPage";
import Report from "./components/UserInterface/Report/Report/Report";
import AdminReport from "./components/AdminInterface/Report/AdminReport/AdminReport";
import ReportDetail from "./components/UserInterface/Report/ReportDetail/ReportDetail";
import AdminReportDetail from "./components/AdminInterface/Report/AdminReportDetail/AdminReportDetail";
import ReportComments from "./components/UserInterface/Report/ReportComments/ReportComments";
import ReportComDetail from "./components/UserInterface/Report/ReportCommentsDetail/ReportComDetail";
import AdminReportCom from "./components/AdminInterface/Report/AdminReportCom/AdminReportCom";
import AdminReportComDetail from "./components/AdminInterface/Report/AdminReportComDetail/AdminReportComDetail";

/* 게시판 페이지 관련 */
import UserNotice from "./components/UserInterface/Board/Notice/UserNotice";
import UserNoticeDetail from "./components/UserInterface/Board/Notice/UserNoticeDetail";
import Notice from "./components/AdminInterface/Board/Notice/Notice";
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
import MemberRating from "./components/UserInterface/Member/Mypage/MemberRating";
import ChangePasswordPage from "./components/UserInterface/Member/Mypage/ChangePassword";
import FindByPwPage from "./components/UserInterface/Member/FindByPasswordPage/FindPwPage";

/* 소셜 관련 */
import KakaoRedirectHandler from "./components/UserInterface/Member/SocialHandler/KakaoRedirectHandler";

/* 렌트카 관련 */
import LongTermRentCarDetail from "./components/UserInterface/RentCar/LongTermRentCar/LongTermRentCarDetail";
import InsertCar from "./components/AdminInterface/RentCar/CarManagement/InsertCar";
import CarManagement from "./components/AdminInterface/RentCar/CarManagement/CarManagement";
import SubscribeRentCar from "./components/UserInterface/RentCar/SubscribeRentCar/SubscribeRentCar";
import LongTermRentCar from "./components/UserInterface/RentCar/LongTermRentCar/LongTermRentCar";
import HotdealRentCar from "./components/UserInterface/RentCar/HotdealRentCar/HotdealRentCar";
import RentalPage from "./components/UserInterface/RentCar/TimeRentCar/RentalPage";

/* User, Admin Interce 분리 관련 */
import UserLayout from "./components/Layout/UserInterface/UserLayout";
import AdminLayout from "./components/Layout/AdminInterface/AdminLayout";
import { AuthProvider } from "./components/UserInterface/Context/AuthContext/AuthContext";
import AdminRoute from "./components/UserInterface/Common/AdminRoute/AdminRoute";
import AdminHotDealRentCar from "./components/AdminInterface/RentCar/HotDealRentCar/AdminHotDealRentCar";
import AdminHotDealRentCarEnrollForm from "./components/AdminInterface/RentCar/HotDealRentCar/AdminHotDealRentCarEnrollForm";
import CarDetails from "./components/AdminInterface/RentCar/CarManagement/CarDetails";
import SignUpPage from "./components/UserInterface/Member/SignPage/SignPage";
import AdminHotDealRentCarUpdate from "./components/AdminInterface/RentCar/HotDealRentCar/AdminHotDealRentCarUpdate";
import MyPage from "./components/UserInterface/Member/Mypage/Mypage";
import InsertRentCar from "./components/AdminInterface/RentCar/RentCarManagement/InsertRentCar";
import RentCarManagement from "./components/AdminInterface/RentCar/RentCarManagement/RentCarManagement";
import RentCarDetails from "./components/AdminInterface/RentCar/RentCarManagement/RenCarDetails";
import UpdatePwPage from "./components/UserInterface/Member/UpdatePasswordPage/UpdatePwPage";
import Garage from "./components/AdminInterface/RentCar/Garage/Garage";
import GarageEnrollForm from "./components/AdminInterface/RentCar/Garage/GarageEnrollForm";
import GarageDetails from "./components/AdminInterface/RentCar/Garage/GarageDetails";
import GarageUpdateForm from "./components/AdminInterface/RentCar/Garage/GarageUpdateForm";
import CarMap from "./components/UserInterface/RentCar/TimeRentCar/CarMap";
import MemberManagement from "./components/AdminInterface/Member/MemberManagement/MemberManagement";
import PaymentsSuccess from "./components/UserInterface/RentCar/LongTermRentCar/PaymentsSuccess";
import PaymentFail from "./components/UserInterface/RentCar/LongTermRentCar/PaymentFail";
import MyReservationList from "./components/UserInterface/Member/MyReservationList/MyReservationList";

function App() {
  return (
    <>
      <ToastContainer />
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
            <Route path="/notice/:id" element={<UserNoticeDetail />} />
            <Route path="/eventBoard" element={<EventBoard />} />
            <Route path="/goEventDetailPage/*" element={<EventBoardDetail />} />
            <Route path="/timerentalPage" element={<RentalPage />}></Route>
            <Route path="/rentCarMap" element={<CarMap />}></Route>

            {/* 회원관련 */}
            <Route path="/loginPage" element={<LoginPage />} />

            <Route path="/memberRating" element={<MemberRating />} />

            <Route path="/signUpPage" element={<SignUpPage />} />

            <Route path="/myPage" element={<MyPage />} />

            <Route
              path="/changePasswordPage"
              element={<ChangePasswordPage />}
            />

            <Route path="/findByPwPage" element={<FindByPwPage />} />

            <Route path="/updatePwPage" element={<UpdatePwPage />} />

            {/* 소셜 관련 */}
            <Route
              path="/auth/kakao/callback"
              element={<KakaoRedirectHandler />}
            />

            {/* 신고 관련 */}
            <Route path="/report/*" element={<Report useDummyData={true} />} />
            <Route
              path="/reportingPage"
              element={<IntegratedReportingPage />}
            ></Route>
            <Route
              path="/reports/:rpNo"
              element={<ReportDetail useDummyData={true} />}
            />
            <Route
              path="/reportCom/*"
              element={<ReportComments useDummyData={true} />}
            />
            <Route
              path="/reportsCom/:rpNo"
              element={<ReportComDetail useDummyData={true} />}
            />

            {/* 뉴스 관련 */}
            <Route path="/newsMain" element={<NewsMain />} />
            <Route path="/newsDetail" element={<NewsDetail />} />
            <Route path="/news-list" element={<NewsList />} />
            <Route path="/newsMyPage" element={<MyNews />} />

            {/* 렌트카 관련 */}
            <Route path="/hotRentCar" element={<HotdealRentCar />} />
            <Route path="/subRentCar" element={<SubscribeRentCar />} />
            <Route
              path="/LongTermRentDetail/*"
              element={<LongTermRentCarDetail />}
            />
            <Route path="/longRentCar" element={<LongTermRentCar />} />
            <Route path="/timerentalPage" element={<RentalPage />} />
            <Route path="/success" element={<PaymentsSuccess />} />
            <Route path="/fail" element={<PaymentFail />} />
            <Route path="/reservationList" element={<MyReservationList />} />
          </Route>

          {/* 아래부터는 관리자페이지만 적자 */}
          {/* Admin 페이지에서 보내는 url 은 /admin/뒤에 URL 이런식으로 보내야함. EX) /admin/insertCar  */}
          {/* Admin Interface */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="main" element={<AdminMain />} />

              {/* 회원 관리 */}
              <Route path="memberManagement" element={<MemberManagement />} />

              {/* 렌트카 관련 */}
              <Route path="insertCar" element={<InsertCar />}></Route>
              <Route path="carManagement" element={<CarManagement />}></Route>
              <Route path="carDetails" element={<CarDetails />}></Route>

              <Route path="insertRentCar" element={<InsertRentCar />} />
              <Route path="rentCarManagement" element={<RentCarManagement />} />
              <Route path="rentCarDetails" element={<RentCarDetails />} />
              <Route
                path="/admin/goHotdealUpdate/*"
                element={<AdminHotDealRentCarUpdate />}
              />
              <Route path="garagePage" element={<Garage />} />
              <Route
                path="/admin/goGarageEnrollForm/*"
                element={<GarageEnrollForm />}
              />
              <Route
                path="/admin/goGarageDetail*"
                element={<GarageDetails />}
              />
              <Route
                path="/admin/goGarageUpdateForm"
                element={<GarageUpdateForm />}
              />

              {/* 게시판 페이지 관련 */}
              <Route path="/admin/notice" element={<Notice />} />
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
              <Route path="hotDealRentCar" element={<AdminHotDealRentCar />} />
              <Route
                path="goHotdealEnrollForm"
                element={<AdminHotDealRentCarEnrollForm />}
              />

              {/* 신고 관련*/}
              <Route
                path="/admin/adminReport/*"
                element={<AdminReport useDummyData={true} />}
              />
              <Route
                path="/admin/adminReports/:rpNo"
                element={<AdminReportDetail useDummyData={true} />}
              />
              <Route
                path="/admin/adminReportCom/*"
                element={<AdminReportCom useDummyData={true} />}
              />
              <Route
                path="/admin/adminReportsCom/:rpNo"
                element={<AdminReportComDetail useDummyData={true} />}
              />

              {/* 뉴스 관련 */}
              <Route path="/admin/adminNews" element={<AdminNews />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
