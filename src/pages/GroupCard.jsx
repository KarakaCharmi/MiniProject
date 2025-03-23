import { useEffect, useReducer, useState } from "react";
import "./GroupCard.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";
import { TrashIcon } from "@heroicons/react/24/solid";
import { groupReducer, initialState } from "../utils/Groupreducer";

const getRandomLightColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 72%, 76%)`;
};

const Symbols = ["user-friends", "briefcase", "home", "users"];
const Abbrev = ["Trip", "Office", "Family", "Team"];

export default function GroupCard({ group }) {
  const [style, setStyle] = useState({ backgroundColor: "" });
  const { user, groups, deleteGroup } = useAuth(); // ✅ Combined useAuth call

  useEffect(() => {
    setStyle({ backgroundColor: getRandomLightColor() });
  }, []);

  const [state, dispatch] = useReducer(groupReducer, {
    ...initialState,
    groups,
    createdBy: user?.email || "",
  });

  const categoryIndex = Abbrev.indexOf(group.category);
  const categorySymbol =
    categoryIndex !== -1 ? Symbols[categoryIndex] : "users";

  return (
    <li>
      <div className="group-card">
        <div className="group-header" style={style}>
          <h2 className="group-name">{group.name}</h2>
          <p className="group-description">{group.description}</p>
          <div className="edit-icon">
            <i
              className={`fas fa-${categorySymbol} 
              text-xl rounded-full h-10 w-10 flex items-center justify-center`}
              style={style}
            ></i>
          </div>
        </div>
        <div className="group-body">
          <div className="status">
            <span className="status-badge settled">Settled</span>
            <span className="status-badge owed">
              You are owed: ₹ {group.amountOwed || 0}
            </span>
          </div>
          <div className="category">
            <span className="category-label">Category</span>
            <span className="category-badge">
              {group.category || "Unknown"}
            </span>
          </div>
        </div>
        <div
          className="relative flex justify-between items-center py-[6px] px-2 rounded-lg shadow-md 
                transition-all duration-300"
        >
          <Link
            to={`${group._id}`}
            className="flex-1 text-center font-bold text-blue-600 bg-blue-600 bg-opacity-20 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-25 hover:scale-101"
          >
            View Group &#x2197;
          </Link>

          <TrashIcon
            onClick={() => deleteGroup(group._id)} // ✅ Fixed event handler
            className="w-10 h-10 mx-1 rounded-md bg-red-500 bg-opacity-20 py-1 text-red-500 cursor-pointer transition-all duration-300 transform 
               hover:text-red-700 hover:scale-110 hover:rotate-12 active:scale-90"
          />
        </div>
      </div>
    </li>
  );
}
