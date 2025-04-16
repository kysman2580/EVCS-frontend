import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import TimeRentCar from "./components/AdminInterface/RentCar/TimeRentCar/TimeRentCar";
import RentalPage from "./components/UserInterface/RentCar/TimeRentCar/RentalPage";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";
import RentCar from "./components/UserInterface/RentCar/RentCar";
import HotdealRentCar from "./components/UserInterface/RentCar/HotdealRentCar/HotdealRentCar";
import LongTermRentCar from "./components/UserInterface/RentCar/LongTermRentCar/LongTermRentCar";
import SubscribeRentCar from "./components/UserInterface/RentCar/SubscribeRentCar/SubscribeRentCar";
import IntegratedReportingPage from "./components/UserInterface/Report/IntegratedReportingPage";
import GlobalStyle from "./components/UserInterface/Common/Header/GlobalStyle";
import EventBoard from "./components/UserInterface/Board/Event/EventBoard";
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";
import Notice from "./components/UserInterface/Board/Notice/Notice";
import CarManagement from "./components/AdminInterface/RentCar/CarManagement/CarManagement";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/timerentalPage" element={<RentalPage />}></Route>
        <Route path="/rentCar" element={<RentCar />}></Route>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/chargingMap" element={<ChargingMap />}></Route>
        <Route path="/notice" element={<Notice />}></Route>
        <Route path="/longRentCar" element={<LongTermRentCar />}></Route>
        <Route path="/hotRentCar" element={<HotdealRentCar />}></Route>
        <Route path="/subRentCar" element={<SubscribeRentCar />}></Route>
        {/* 아래부터는 관리자페이지만 적자 */}
        <Route path="/adminCarManagement" element={<CarManagement />}></Route>
        <Route path="/adminTimeCar" element={<TimeRentCar />}></Route>
        <Route
          path="/reportingPage"
          element={<IntegratedReportingPage />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
