import { useEffect, useReducer, useState } from "react";
import "./CreateGroup.css";
import axios from "axios";
import { useAuth } from "../contextapi/UserAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { groupReducer, initialState } from "../utils/Groupreducer";

const API_URL = "http://localhost:5000";

export default function CreateGroup() {
  const { user, groups } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [memberInput, setMemberInput] = useState("");
  const [mailInput, setMailInput] = useState("");
  // ✅ Ensure createdBy is always updated
  const [state, dispatch] = useReducer(groupReducer, {
    ...initialState,
    groups,
    createdBy: user?.email || "",
  });

  useEffect(() => {
    if (user?.email) {
      dispatch({ type: "SET_FIELD", field: "createdBy", value: user.email });
    }
  }, [user]);

  // ✅ Prevent invalid emails
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (memberInput.trim() && mailInput.trim()) {
        // Combine name and email in the format: Name (Email)
        const member = `${memberInput.trim()} (${mailInput
          .trim()
          .toLowerCase()})`;

        // Dispatch the action with member information
        dispatch({
          type: "ADD_MEMBER",
          email: member,
        });

        // Clear inputs
        setMemberInput("");
        setMailInput("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!state.createdBy) {
      toast.error("You must be logged in to create a group.");
      setLoading(false);
      return;
    }

    const groupData = {
      name: state.groupName,
      description: state.groupDescription,
      members: state.members,
      currency: state.currency,
      category: state.category,
      createdBy: state.createdBy,
    };

    try {
      const response = await axios.post(`${API_URL}/groups`, groupData);
      toast.success("Group created successfully!", { autoClose: 3000 });

      setTimeout(() => navigate("/explore/groups"), 1000);
      dispatch({ type: "RESET" });
    } catch (error) {
      toast.error("Error creating group. Please try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
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
          </div>
          {/* <input
              type="text"
              placeholder="Add Member (Name)"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input-field member-input"
            /> */}
          <div className="flex  flex-rows-[auto_1fr ] gap-2 mt-2">
            <input
              type="text"
              placeholder="Name"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-2  p-2 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              value={mailInput}
              onChange={(e) => setMailInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-2 w-[400px] ml-4 rounded-lg"
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
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Group"}
        </button>
      </form>
    </div>
  );
}
