import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";
import RentCar from "./components/UserInterface/RentCar/RentCar";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/rentCar" element={<RentCar />}></Route>
        <Route path="/chargingMap" element={<ChargingMap />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
