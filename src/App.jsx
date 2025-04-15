import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import TimeRentCar from "./components/AdminInterface/RentCar/TimeRentCar/TimeRentCar";
import RentalPage from "./components/UserInterface/RentCar/TimeRentCar/RentalPage";
import StackedExample from "./components/UserInterface/Common/Nav/Nav";

function App() {
  return (
    <>
      <Header />
      <StackedExample />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/admintimecar" element={<TimeRentCar />}></Route>
        <Route path="/timerentalPage" element={<RentalPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
