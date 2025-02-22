import React from "react";
import Title from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Home />
      </div>
    </div>
  );
};

export default AppLayout;
