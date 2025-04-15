import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import TimeRentCar from "./components/AdminInterface/RentCar/TimeRentCar/TimeRentCar";
import RentalPage from "./components/UserInterface/RentCar/TimeRentCar/RentalPage";
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/admintimecar" element={<TimeRentCar />}></Route>
        <Route path="/timerentalPage" element={<RentalPage />}></Route>
        <Route path="/rentCar" element={<RentCar />}></Route>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/chargingMap" element={<ChargingMap />}></Route>
        <Route path="/notice" element={<Notice />}></Route>
        <Route path="/longRentCar" element={<LongTermRentCar />}></Route>
        <Route path="/hotRentCar" element={<HotdealRentCar />}></Route>
        <Route path="/subRentCar" element={<SubscribeRentCar />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
