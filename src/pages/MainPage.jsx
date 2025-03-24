import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";
// import GroupCard from "./GroupCard";
import axios from "axios";
import Chatbot from "./Chatbot";
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
  const { setGroups, user } = useAuth();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  // Fetch groups from database when the component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/groups?email=${user?.email}`
        );
        setGroups(res.data); // Set state with fetched groups
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [user?.email]); // Runs only once when the component mounts

  // Function to add a new group to state
  // const addGroup = (newGroup) => {
  //   setGroups([...groups, newGroup]);
  // };

  return (
    <div className="flex">
      <div className="w-[350px] fixed h-screen top-0 left-0">{<Sidebar />}</div>
      <div
        className={`flex-1 ml-[350px] mt-10 right-0 ${
          isChatbotOpen ? "blur-sm" : ""
        }`}
      >
        <Outlet />
      </div>
      {/* /* Chatbot Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <div
          onMouseDown={() => setIsChatbotOpen(!isChatbotOpen)}
          className="relative p-[1px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          <button className="p-3 w-auto bg-gray-900 hover:bg-gray-800 font-mono text-cyan-400 rounded-full shadow-lg flex items-center justify-center w-12 h-12 border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:rounded-full before:p-[2px] before:bg-gradient-to-r before:from-cyan-400 before:to-blue-500 before:-z-10">
            💬 Chat
          </button>
        </div>
      </div>

      {/* Overlay and Chatbot */}
      {isChatbotOpen && (
        <div>
          <Chatbot
            isOpen={isChatbotOpen}
            onClose={() => setIsChatbotOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
