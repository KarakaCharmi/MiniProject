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
  const [emailInput, setEmailInput] = useState("");

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
  const handleKeyDownName = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch({
        type: "ADD_MEMBER",
        member_name: memberInput.trim().toLowerCase(),
      });
      setMemberInput("");
    }
  };

  const handleKeyDownEmail = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch({
        type: "ADD_EMAIL",
        email: emailInput.trim().toLowerCase(),
      });
      setEmailInput("");
    }
  };

  function handleAdd(e) {
    e.preventDefault();
    if (memberInput && emailInput) {
      //Adding email
      dispatch({
        type: "ADD_EMAIL",
        email: emailInput.trim().toLowerCase(),
      });
      setEmailInput("");

      //Adding memebr name
      dispatch({
        type: "ADD_MEMBER",
        member_name: memberInput.trim().toLowerCase(),
      });
      setMemberInput("");
    } else {
      toast.error("Enter both name and email fields");
    }
  }

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
      emails: state.emails,
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
    <div className="form-container tracking-widest text-slate-600">
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
        <div className="members-container flex flex-col gap-5">
          <div className="members-input-wrapper ">
            {state.members.map((member, index) => (
              <span key={index} className="member-tag">
                {`${member} : ${state.emails[index]}`}
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "REMOVE_MEMBER", member_name: member });
                    dispatch({
                      type: "REMOVE_MEMBER",
                      email: state.emails[index],
                    });
                  }}
                  className="remove-member-btn"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex flex-row mr-auto gap-6 w-full">
            <input
              type="text"
              placeholder="Add Member (Name)"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              className="border-b-[1.3px] border-slate-400 grow outline-none tracking-widest"
            />
            <input
              type="text"
              placeholder="Add Member (Email)"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="border-b-[1.3px] border-slate-400 grow outline-none tracking-widest"
            />

            <button
              onClick={(e) => handleAdd(e)}
              className="border text-white bg-blue-500  font-semibold shadow-md tracking-widest px-2 py-1 rounded-md "
            >
              ADD
            </button>
          </div>
        </div>

        {/* <div className="members-container">
          <div className="members-input-wrapper">
            {state.emails.map((email, index) => (
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
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyDownEmail}
              className="input-field member-input"
            />
          </div> 
        </div>*/}
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
            <option value="Home">Others</option>
          </select>
        </div>
        <button
          type="submit"
          className="submit-btn shadow-md px-1 py-2 tracking-widest transition-all duration-300 rounded-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </form>
    </div>
  );
}
