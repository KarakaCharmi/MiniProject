import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";
// import GroupCard from "./GroupCard";
import axios from "axios";
// import { Link } from "react-router-dom";
// import { useAuth } from "../contextapi/UserAuth";

export function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="h-full p-5 bg-gray-300">
      <div className="mb-5">
        <div className="flex items-center space-x-3">
          <img
            src={`https://robohash.org/${user?.email}?set=set4`}
            alt="Nature Avatar"
            className="w-12 h-12 rounded"
          />

          <div>
            <h2 className="text-lg font-bold">{user?.name || "User"}</h2>
            <p className="text-sm text-gray-700">{user?.email || "No Email"}</p>
          </div>
        </div>
      </div>

      <nav>
        <ul className="space-y-3 font-mono">
          <li>
            <NavLink
              to="/explore/dashboard"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive
                    ? "bg-cyan-500 text-white font-bold"
                    : "hover:bg-cyan-500 hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore/groups"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive
                    ? "bg-cyan-500 text-white font-bold"
                    : "hover:bg-cyan-500 hover:text-white"
                }`
              }
            >
              Groups
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore/creategroup"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive
                    ? "bg-cyan-500 text-white font-bold"
                    : "hover:bg-cyan-500 hover:text-white"
                }`
              }
            >
              Create Group
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive
                    ? "bg-cyan-500 text-white font-bold"
                    : "hover:bg-cyan-500 hover:text-white"
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <button
              onClick={logout}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// export default Sidebar;

const MainPage = () => {
  // const [option, setIsOption] = useState("CreateGroup");
  // Store created groups
  const { user, groups, setGroups } = useAuth();

  // Fetch groups from database when the component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:5000/groups");
        setGroups(res.data); // Set state with fetched groups
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []); // Runs only once when the component mounts

  // Function to add a new group to state
  const addGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  return (
    <div className="flex">
      <div className="w-[350px] fixed h-screen top-0 left-0">
        <Sidebar />
      </div>
      <div className="flex-1 ml-[350px]  mt-10 right-0">
        <Outlet />
      </div>
    </div>
  );
};
export default MainPage;
