import { Link, Outlet } from "react-router-dom";
import { Users, BarChart2, FileText, DollarSign, Home } from "lucide-react"; // Importing icons
// import GroupCardInfo from "./GroupCardInfo";

const GroupSideBar = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-[80px] fixed h-screen bg-gray-900 text-white p-5 flex flex-col gap-6">
        <Link
          to=""
          className="hover:bg-gray-700 p-3 rounded flex justify-center"
        >
          <Home size={24} />
        </Link>
        <Link
          to="participants"
          className="hover:bg-gray-700 p-3 rounded flex justify-center"
        >
          <Users size={24} />
        </Link>
        <Link
          to=""
          className="hover:bg-gray-700 p-3 rounded flex justify-center"
        >
          <BarChart2 size={24} />
        </Link>
        <Link
          to=""
          className="hover:bg-gray-700 p-3 rounded flex justify-center"
        >
          <FileText size={24} />
        </Link>
        <Link
          to=""
          className="hover:bg-gray-700 p-3 rounded flex justify-center"
        >
          <DollarSign size={24} />
        </Link>
      </div>

      {/* Right Content */}
      <div className="flex-1   p-5 ">
        <Outlet />
        {/* Right-side content changes dynamically */}
      </div>
    </div>
  );
};

export default GroupSideBar;
