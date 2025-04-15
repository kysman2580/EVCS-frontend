import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";
import HotdealRentCar from "./components/UserInterface/RentCar/HotdealRentCar/HotdealRentCar";
import LongTermRentCar from "./components/UserInterface/RentCar/LongTermRentCar/LongTermRentCar";
import SubscribeRentCar from "./components/UserInterface/RentCar/SubscribeRentCar/SubscribeRentCar";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/chargingMap" element={<ChargingMap />}></Route>
        <Route path="/longRentCar" element={<LongTermRentCar />}></Route>
        <Route path="/hotRentCar" element={<HotdealRentCar />}></Route>
        <Route path="/subRentCar" element={<SubscribeRentCar />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
