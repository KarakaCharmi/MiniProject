import { useParams } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";
import { useState } from "react";

export default function GroupMembers() {
  const { groups, updateGroupMembers } = useAuth();
  const { id } = useParams();
  const group = groups.find((item) => item._id === id) || {};
  //   const { members = [] } = group;
  const balance = 100;
  const totalPaid = 200;
  const [members, setMembers] = useState(group.members || []);
  const [newMember, setNewMember] = useState("");
  const [message, setMessage] = useState("");
  function handleChange(e) {
    setNewMember(e.target.value);
  }

  async function addMember() {
    if (!newMember.trim()) {
      setMessage("Please enter a name.");
      return;
    }
    if (
      members.some((member) => member.toLowerCase() === newMember.toLowerCase())
    ) {
      setMessage("Member already exists");
      setNewMember("");
      return;
    }

    const updatedMembers = [...members, newMember];

    try {
      const response = await fetch(
        `http://localhost:5000/groups/${id}/members`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ members: updatedMembers }),
        }
      );

      if (!response.ok) throw new Error("Failed to update members");

      // Update local state
      setMembers(updatedMembers);
      setNewMember("");

      // Update global context (VERY IMPORTANT)
      updateGroupMembers(id, updatedMembers);

      console.log("Member added successfully!");
    } catch (error) {
      console.error("Error updating members:", error);
      alert("Failed to add member. Please try again.");
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-1">Group Members</h2>
      <p className="text-gray-500 text-sm mb-4">
        Manage members, assign roles, and invite new users
      </p>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="p-3 text-left">Name</th>

            <th className="p-3 text-left">Balance</th>
            <th className="p-3 text-left">Total Paid</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="p-3 flex items-center space-x-3">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold "
                  style={{
                    backgroundColor: `hsl(${
                      (member.charCodeAt(0) * 15) % 360
                    }, 70%, 80%)`, // Light Color
                    color: "black", // Dark text for better contrast
                  }}
                >
                  {member.charAt(0).toUpperCase()}
                </div>

                <div>
                  <strong>{member}</strong>
                </div>
              </td>

              <td
                className={`p-3 ${
                  balance < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                ₹{(balance ?? 0).toFixed(2)}
              </td>
              <td className="p-3">₹{(totalPaid ?? 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          name="name"
          value={newMember}
          onChange={handleChange}
          placeholder="Enter member name"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addMember}
          className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
        >
          Add
        </button>
      </div>
      <p className="text-red-400 bg-red-500 bg-opacity-5 text-sm mt-2">
        {message}
      </p>
    </div>
  );
}
