import { Routes, Route } from "react-router-dom";
import Header from "./components/UserInterface/Common/Header/Header";
import Footer from "./components/UserInterface/Common/Footer/Footer";
import Main from "./components/UserInterface/Main/Main";
import LoginPage from "./components/UserInterface/Member/LoginPage/LoginPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        {/* <Route path="/loginPage" element={<LoginPage />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
