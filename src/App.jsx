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
import Groups from "./features/Groupdetails/Groups";
import CreateGroup from "./pages/CreateGroup";
import GroupCardInfo from "./features/Groupdetails/GroupCardInfo";
import AddingNewExpense from "./features/AddingExpense/AddingNewExpense";
import AppLayout from "./AppLayout";
import GroupSideBar from "./features/Groupdetails/GroupSideBar";
import Participants from "./SideNavBarFeatures/Participants";
function App() {
  const { user } = useAuth();
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
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
        <Route path="explore/groups/:id" element={<GroupSideBar />}>
          <Route path="participants" element={<Participants />} />
          <Route path="newExpense" element={<AddingNewExpense />} />
          <Route index path="*" element={<GroupCardInfo />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
