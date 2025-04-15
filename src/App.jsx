import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";
import RentCar from "./components/UserInterface/RentCar/RentCar";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
<<<<<<< HEAD
        <Route path="/rentCar" element={<RentCar />}></Route>
=======
        <Route path="/loginPage" element={<LoginPage />} />
>>>>>>> 85b60d9b3df0c7811f8cee71a4810fd4d22eb016
        <Route path="/chargingMap" element={<ChargingMap />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
