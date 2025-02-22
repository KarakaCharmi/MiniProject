// import { useState } from "react";
// import { Link } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import { useState } from "react";
import Dashboard from "./Dashboard";
import Groups from "./Groups";
import About from "./About";
import { useNavigate } from "react-router-dom";
export function Sidebar({ option, setIsOption }) {
  const navigate = useNavigate();
  return (
    <div className="h-screen  bg-gray-300 p-5">
      <div className="mb-5">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-orange-200/50 rounded-full"></div>
          <div>
            <h2 className="text-lg font-bold">Charmi Karaka</h2>
            <p className="text-sm text-gray-700">karakacharmi@gmail.com</p>
          </div>
        </div>
      </div>
      <nav>
        <ul className="space-y-3 font-mono">
          <li>
            <a
              className={`block p-2 rounded ${
                option === "Dashboard" ? "bg-cyan-500 text-white" : ""
              } hover:bg-cyan-500  hover:text-white`}
              onClick={() => setIsOption("Dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              className={`block p-2 rounded ${
                option === "Groups" ? "bg-cyan-500 text-white" : ""
              } hover:bg-cyan-500 hover:text-white`}
              onClick={() => setIsOption("Groups")}
            >
              Groups
            </a>
          </li>
          <li>
            <a
              className={`block p-2 rounded ${
                option === "CreateGroup" ? "bg-cyan-500 text-white" : ""
              } hover:bg-cyan-500  hover:text-white`}
              onClick={() => setIsOption("CreateGroup")}
            >
              Create Group
            </a>
          </li>
          <li>
            <a
              className={`block p-2 rounded ${
                option === "About" ? "bg-cyan-500 text-white" : ""
              } hover:bg-cyan-500  hover:text-white`}
              onClick={() => {
                setIsOption("About");
                navigate("/");
              }}
            >
              About
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// const CreateGroup = () => {
//   return (
//     <div className="p-10">
//       <h2 className="text-2xl font-semibold mb-5">Create New Group</h2>
//       <input
//         type="text"
//         placeholder="Group Name"
//         className="w-full p-2 mb-3 border rounded"
//       />
//       <textarea
//         placeholder="Group Description"
//         className="w-full p-2 mb-3 border rounded"
//       ></textarea>
//       <input
//         type="text"
//         value="karakacharmi@gmail.com"
//         readOnly
//         className="w-full p-2 mb-3 border rounded bg-gray-200"
//       />
//       <div className="flex space-x-3">
//         <select className="w-1/2 p-2 border rounded">
//           <option>Currency</option>
//         </select>
//         <select className="w-1/2 p-2 border rounded">
//           <option>Category</option>
//         </select>
//       </div>
//       <button className="mt-5 bg-cyan-500 text-white px-4 py-2 rounded">
//         Create Group
//       </button>
//     </div>
//   );
// };

const MainPage = () => {
  const [option, setIsOption] = useState("CreateGroup");
  return (
    <div className="flex ">
      <div className="w-1/4 fixed top-0 left-0">
        <Sidebar option={option} setIsOption={setIsOption} />
      </div>
      <div className="w-3/4 absolute top-[10%] right-0 ">
        {option === "Dashboard" && <Dashboard />}
        {option === "Groups" && <Groups />}
        {/* {option === "About" && <About />} */}
        {option === "CreateGroup" && <CreateGroup />}
      </div>
    </div>
  );
};

export default MainPage;
