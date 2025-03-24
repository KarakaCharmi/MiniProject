import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
const Layout = () => {
  return (
    <div className="grid grid-rows-[1/2fr_6fr_1fr] h-screen">
      <Navbar />
      <main className="overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
