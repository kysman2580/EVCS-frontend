import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import TimeRentCar from "./components/AdminInterface/RentCar/TimeRentCar/TimeRentCar";
import RentalPage from "./components/UserInterface/RentCar/TimeRentCar/RentalPage";
import StackedExample from "./components/UserInterface/Common/Nav/Nav";
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";
import RentCar from "./components/UserInterface/RentCar/RentCar";

function App() {
  return (
    <>
      <Header />
      <StackedExample />
      <Routes>
        <Route path="/" element={<Main />}></Route>
<<<<<<< HEAD
        <Route path="/admintimecar" element={<TimeRentCar />}></Route>
        <Route path="/timerentalPage" element={<RentalPage />}></Route>
=======
<<<<<<< HEAD
        <Route path="/rentCar" element={<RentCar />}></Route>
=======
>>>>>>> bc3d0db58dfce636341a935213ce7125c154ab8f
        <Route path="/loginPage" element={<LoginPage />} />
>>>>>>> 85b60d9b3df0c7811f8cee71a4810fd4d22eb016
        <Route path="/chargingMap" element={<ChargingMap />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
