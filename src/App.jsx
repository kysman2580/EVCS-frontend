import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import TimeRentCar from "./components/AdminInterface/RentCar/TimeRentCar/TimeRentCar";
import RentalPage from "./components/UserInterface/RentCar/TimeRentCar/RentalPage";
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";
import RentCar from "./components/UserInterface/RentCar/RentCar";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/admintimecar" element={<TimeRentCar />}></Route>
        <Route path="/timerentalPage" element={<RentalPage />}></Route>
        <Route path="/rentCar" element={<RentCar />}></Route>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/chargingMap" element={<ChargingMap />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
