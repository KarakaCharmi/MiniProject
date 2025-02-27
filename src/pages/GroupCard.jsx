import { useEffect, useState } from "react";
import "./GroupCard.css";
import GroupCardInfo from "./GroupCardInfo";
import { Link } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";

const getRandomLightColor = () => {
  const hue = Math.floor(Math.random() * 360); // Restrict to 360 to stay within HSL range
  return `hsl(${hue}, 72%, 76%)`; // Light color with high saturation and brightness
};

const Symbols = ["user-friends", "briefcase", "home", "users"];
const Abbrev = ["Trip", "Office", "Family", "Team"];

export default function GroupCard({ group }) {
  const [style, setStyle] = useState({ backgroundColor: "" });
  const { groups } = useAuth();
  useEffect(() => {
    setStyle({ backgroundColor: getRandomLightColor() });
  }, []); // Runs only once on mount

  // Find category index
  const categoryIndex = Abbrev.indexOf(group.category);
  const categorySymbol =
    categoryIndex !== -1 ? Symbols[categoryIndex] : "users";

  return (
    <li>
      <div className="group-card">
        <div className="group-header" style={style}>
          <h2 className="group-name">{group.name}</h2>{" "}
          {/* Fixed property name */}
          <p className="group-description">{group.description}</p>{" "}
          {/* Fixed property name */}
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

        <Link to={`/groupinfo/${group.name}`} className="group-card__link">
          View Group &#x2197;
        </Link>
      </div>
    </li>
  );
}
