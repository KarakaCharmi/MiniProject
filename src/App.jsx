import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Title from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainPage, { Sidebar } from "./pages/MainPage";
import About from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="aboutus" element={<About />} />
        <Route path="explore" element={<MainPage />} />
        {/* <Route path="main" element={<MainPage />} /> */}
        <Route path="*" element={<AppLayout />} />
      </Routes>
    </>
  );
}

export default App;
