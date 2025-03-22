import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import About from "./pages/About";
// import { useState } from "react";
import { useAuth } from "./contextapi/UserAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";
import GroupCardInfo from "./pages/GroupCardInfo";
import AddingNewExpense from "./features/PayBill/AddingNewExpense";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Nested Routes inside MainPage */}
        <Route path="explore" element={<MainPage userEmail={user?.email} />}>
          <Route index element={<CreateGroup userEmail={user?.email} />} />
          <Route
            path="creategroup"
            element={<CreateGroup userEmail={user?.email} />}
          />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="groups" element={<Groups userEmail={user?.email} />} />
        </Route>

        <Route path="/groupinfo/:id" element={<GroupCardInfo />} />
        <Route path="groups/newExpense" element={<AddingNewExpense />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
