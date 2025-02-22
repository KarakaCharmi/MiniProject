import { useState } from "react";
import "./CreateGroup.css";

export default function CreateGroup() {
  const [formData, setFormData] = useState({
    groupName: "",
    groupDescription: "",
    members: [],
    currency: "",
    category: "",
  });

  const [memberInput, setMemberInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      addMember();
    }
  };

  const addMember = () => {
    const email = memberInput.trim().toLowerCase();

    if (
      email &&
      !formData.members.includes(email) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setFormData({ ...formData, members: [...formData.members, email] });
      setMemberInput("");
    }
  };

  const handleRemoveMember = (emailToRemove) => {
    const updatedMembers = formData.members.filter(
      (email) => email !== emailToRemove
    );
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Group</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="groupName"
          placeholder="Group Name"
          value={formData.groupName}
          onChange={handleChange}
          className="input-field"
          required
        />
        <textarea
          name="groupDescription"
          placeholder="Group Description"
          value={formData.groupDescription}
          onChange={handleChange}
          className="input-field"
          required
        />
        <div className="members-container">
          <div className="members-input-wrapper">
            {formData.members.map((email, index) => (
              <span key={index} className="member-tag">
                {email}
                <button
                  type="button"
                  onClick={() => handleRemoveMember(email)}
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
            value={formData.currency}
            onChange={handleChange}
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
            value={formData.category}
            onChange={handleChange}
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
