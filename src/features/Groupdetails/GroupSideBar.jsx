import { NavLink, Outlet } from "react-router-dom";
import { Users, BarChart2, FileText, DollarSign, Home } from "lucide-react";
import Navbar from "../../ui/Navbar";

const GroupSideBar = () => {
  const style1 =
    "bg-gradient-to-br from-[#4C8BF5] to-[#A1B3CC] text-white font-extrabold shadow-lg backdrop-blur-md border border-[#6c91d5]/30";
  const style2 =
    "text-[#A1B3CC] hover:text-white hover:bg-[#1e2a40] hover:shadow-md hover:scale-105 transition-transform duration-300";

  return (
    <div className="h-screen bg-[#0F172A] flex flex-col">
      {/* Top Navbar */}
      <div className="bg-white shadow-md z-10">
        <Navbar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-[64px] mt-2 h-screen fixed left-0 bg-[#1a2332] p-2 flex flex-col gap-6 
                     rounded-r-xl shadow-2xl border-r border-[#2E3A50]"
        >
          {/* Sidebar Icon Item */}
          <div className="relative group flex justify-center">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `p-3 rounded-2xl transition-all duration-300 ease-in-out ${
                  isActive ? style1 : style2
                }`
              }
            >
              <Home size={24} strokeWidth={2.2} />
            </NavLink>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#2d3b56] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow">
              Home
            </span>
          </div>

          <div className="relative group flex justify-center">
            <NavLink
              to="participants"
              className={({ isActive }) =>
                `p-3 rounded-2xl transition-all duration-300 ease-in-out ${
                  isActive ? style1 : style2
                }`
              }
            >
              <Users size={24} strokeWidth={2.2} />
            </NavLink>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#2d3b56] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow">
              Participants
            </span>
          </div>

          <div className="relative group flex justify-center">
            <NavLink
              to="statistics"
              className={({ isActive }) =>
                `p-3 rounded-2xl transition-all duration-300 ease-in-out ${
                  isActive ? style1 : style2
                }`
              }
            >
              <BarChart2 size={24} strokeWidth={2.2} />
            </NavLink>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#2d3b56] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow">
              Statistics
            </span>
          </div>

          <div className="relative group flex justify-center">
            <NavLink
              to="overview"
              className={({ isActive }) =>
                `p-3 rounded-2xl transition-all duration-300 ease-in-out ${
                  isActive ? style1 : style2
                }`
              }
            >
              <FileText size={24} strokeWidth={2.2} />
            </NavLink>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#2d3b56] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow">
              Overview
            </span>
          </div>

          <div className="relative group flex justify-center">
            <NavLink
              to="transactions"
              className={({ isActive }) =>
                `p-3 rounded-2xl transition-all duration-300 ease-in-out ${
                  isActive ? style1 : style2
                }`
              }
            >
              <DollarSign size={24} strokeWidth={2.2} />
            </NavLink>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#2d3b56] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow">
              Transactions
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div
          className="flex-1 ml-[70px] pt-0 mt-2 bg-white rounded-lg  
                     max-h-screen overflow-y-auto shadow-2xl border-2 border-[#2E3A50] border-t-2"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GroupSideBar;
