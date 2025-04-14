import { NavLink, Outlet } from "react-router-dom";
import { Users, BarChart2, FileText, DollarSign, Home } from "lucide-react";
import Navbar from "../../ui/Navbar";

const GroupSideBar = () => {
  const style1 =
    "bg-[#A1B3CC] bg-opacity-20 text-stone-100 font-extrabold  text-[#4C8BF5] shadow-md";
  const style2 = "text-[#A1B3CC] hover:text-[#4C8BF5] hover:bg-[#25334D]";
  return (
    <div className="h-screen bg-[#121826] flex flex-col">
      {/* Fixed Navbar at the Top */}
      <div className="bg-white">
        <Navbar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar on the Left */}
        <div
          className="w-[60px] mt-2 h-screen fixed left-0 bg-[#192235] p-2 flex flex-col gap-6 
                     rounded-r-xl shadow-2xl border-r-2 border-[#2E3A50] border-t-2"
        >
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `p-3  rounded-xl flex justify-center  transition duration-200 ${
                isActive ? style1 : style2
              }`
            }
          >
            <Home size={32} />
          </NavLink>

          <NavLink
            to="participants"
            className={({ isActive }) =>
              `p-3  rounded-xl flex justify-center  transition duration-200 ${
                isActive ? style1 : style2
              }`
            }
          >
            <Users size={32} />
          </NavLink>

          <NavLink
            to="statistics"
            className={({ isActive }) =>
              `p-3  rounded-xl flex justify-center  transition duration-200 ${
                isActive ? style1 : style2
              }`
            }
          >
            <BarChart2 size={32} />
          </NavLink>

          <NavLink
            to="overview"
            className={({ isActive }) =>
              `p-3  rounded-xl flex justify-center  transition duration-200 ${
                isActive ? style1 : style2
              }`
            }
          >
            <FileText size={32} />
          </NavLink>

          <NavLink
            to="transactions"
            className={({ isActive }) =>
              `p-3  rounded-xl flex justify-center  transition duration-200 ${
                isActive ? style1 : style2
              }`
            }
          >
            <DollarSign size={32} />
          </NavLink>
        </div>

        {/* Right Content Area (Scrollable) */}
        <div
          className="flex-1 ml-[70px] pt-0 mt-2 bg-[#fff] rounded-lg  
                     min-h-screen overflow-y-auto shadow-2xl border-2 border-[#2E3A50] border-t-2 "
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GroupSideBar;
