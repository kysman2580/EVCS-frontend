import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import ChargingMap from "./components/UserInterface/ChargingMap/ChargingMap";
import Notice from "./components/UserInterface/Board/Notice/Notice";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/chargingMap" element={<ChargingMap />}></Route>
        <Route path="/notice" element={<Notice />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
