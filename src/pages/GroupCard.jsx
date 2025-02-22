// import React from "react";
import "./GroupCard.css";
// import { FaEdit } from "react-icons/fa";
const Symbols = ["user-friends", "briefcase ", "home", "users"];
const Abbrev = ["Trip", "Office", "Family", "Team"];
export default function GroupCard({ group }) {
  return (
    <li>
      <div className="group-card">
        <div className="group-header" style={{ backgroundColor: group.color }}>
          <h2 className="group-name">{group.name}</h2>
          <p className="group-description">{group.description}</p>
          <div className="edit-icon">
            <i
              style={{ backgroundColor: group.color }}
              className={`fas fa-${
                Symbols[group.category]
              } text-xl rounded-full h-10 w-10 flex items-center justify-center`}
            ></i>
          </div>
        </div>
        <div className="group-body">
          <div className="status">
            <span className="status-badge settled">Settled</span>
            <span className="status-badge owed">
              You are owed : ₹ {group.amountOwed}
            </span>
          </div>
          <div className="category">
            <span className="category-label">Category</span>
            <span className="category-badge">{Abbrev[group.category]}</span>
          </div>
          {/* <div className="members">
          {group.members.map((member, index) => (
            <img key={index} src={member.avatar} alt="Member" className="member-avatar" />
          ))}
        </div> */}
        </div>
      </div>
    </li>
  );
}
