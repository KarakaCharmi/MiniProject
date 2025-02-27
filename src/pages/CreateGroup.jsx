import { useReducer, useState } from "react";
import "./CreateGroup.css";
import axios from "axios";
import { useAuth } from "../contextapi/UserAuth";
import { Navigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const initialState = {
  groupName: "",
  groupDescription: "",
  members: [],
  currency: "",
  category: "",
  createdBy: "", // Will be set dynamically
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_MEMBER":
      if (
        action.email &&
        !state.members.includes(action.email) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.email)
      ) {
        return { ...state, members: [...state.members, action.email] };
      }
      return state;
    case "REMOVE_MEMBER":
      return {
        ...state,
        members: state.members.filter((email) => email !== action.email),
      };
    case "RESET":
      return { ...initialState, createdBy: state.createdBy };
    default:
      return state;
  }
}

export default function CreateGroup() {
  const { user } = useAuth(); // ✅ Move useAuth() inside the component
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    createdBy: user?.email || "", // Set createdBy dynamically
  });
  const [memberInput, setMemberInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch({ type: "ADD_MEMBER", email: memberInput.trim().toLowerCase() });
      setMemberInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract values from state
    const {
      groupName,
      groupDescription,
      members,
      currency,
      category,
      createdBy,
    } = state;

    // Ensure createdBy is not empty (if user is logged in)
    if (!createdBy) {
      console.error("Error: User is not authenticated.");
      return;
    }

    const groupData = {
      name: groupName, // ✅ Correctly mapped
      description: groupDescription, // ✅ Correctly mapped
      members,
      currency,
      category,
      createdBy, // ✅ Use createdBy from state
    };

    try {
      const response = await axios.post(`${API_URL}/groups`, groupData);
      console.log("Group created successfully:", response.data);
      // Redirect to Groups page
      dispatch({ type: "RESET" });
      setIsOption("Groups"); // Reset form fields
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Group</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="groupName"
          placeholder="Group Name"
          value={state.groupName}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "groupName",
              value: e.target.value,
            })
          }
          className="input-field"
          required
        />
        <textarea
          name="groupDescription"
          placeholder="Group Description"
          value={state.groupDescription}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "groupDescription",
              value: e.target.value,
            })
          }
          className="input-field"
          required
        />
        <div className="members-container">
          <div className="members-input-wrapper">
            {state.members.map((email, index) => (
              <span key={index} className="member-tag">
                {email}
                <button
                  type="button"
                  onClick={() => dispatch({ type: "REMOVE_MEMBER", email })}
                  className="remove-member-btn"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add Member (Email)"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input-field member-input"
            />
          </div>
        </div>
        <div className="currencycont">
          <select
            name="currency"
            value={state.currency}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "currency",
                value: e.target.value,
              })
            }
            className="input-field"
            required
          >
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
          <select
            name="category"
            value={state.category}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "category",
                value: e.target.value,
              })
            }
            className="input-field"
            required
          >
            <option value="">Select Category</option>
            <option value="Trip">Trip</option>
            <option value="Office">Office</option>
            <option value="Temples">Temples</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Create Group
        </button>
      </form>
    </div>
  );
}
