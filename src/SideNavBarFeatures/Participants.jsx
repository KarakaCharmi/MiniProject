import { useParams } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";
import { useState } from "react";
import { getDebts } from "../utils/getDebts";

export default function GroupMembers() {
  const { groups, updateGroupMembers } = useAuth();
  const { id } = useParams();
  const group = groups.find((item) => item._id === id) || {};
  const { members: groupMembers, transactions } = group;
  /* const balance = 100;
  const totalPaid = 200; */
  const [members, setMembers] = useState(groupMembers || []);
  const [newMember, setNewMember] = useState("");
  const [message, setMessage] = useState("");

  const debts = getDebts({ members: groupMembers, transactions });

  const totalPaid = {};
  const totalSpent = {};

  members.forEach((member) => {
    totalPaid[member] = 0;
  });

  transactions.forEach((transaction) => {
    totalPaid[transaction.paidBy] += transaction.amount;
  });

  const balance = {};

  groupMembers.forEach((member) => {
    balance[member] = 0;
  });

  groupMembers.forEach((from) => {
    groupMembers.forEach((to) => {
      balance[from] += debts[to][from];
      balance[from] -= debts[from][to]; //loan
    });
  });

  groupMembers.forEach((member) => {
    totalSpent[member] = totalPaid[member] - balance[member];
  });

  function handleChange(e) {
    setNewMember(e.target.value);
  }

  async function addMember() {
    if (!newMember.trim()) {
      setMessage("Please enter a name.");
      setMessage("");
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
      setMessage("");

      // Update global context (VERY IMPORTANT)
      updateGroupMembers(id, updatedMembers);

      console.log("Member added successfully!");
    } catch (error) {
      console.error("Error updating members:", error);
      alert("Failed to add member. Please try again.");
    }
  }

  return (
    <div className="bg-white mt-2 p-6 rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Group Members
      </h2>
      <p className="text-teal-500  font-sans text-sm mb-4">
        Manage members, assign roles, and invite new users
      </p>

      <table className="w-full border-collapse rounded-md overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Balance</th>
            <th className="p-3 text-left">Money Paid</th>
            <th className="p-3 text-left">Money Spent</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {members.map((member, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="p-3 flex items-center space-x-3">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold shadow-sm"
                  style={{
                    backgroundColor: `hsl(${
                      (member.charCodeAt(0) * 15) % 360
                    }, 70%, 80%)`,
                    color: "black",
                  }}
                >
                  {member.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-800">
                  {member
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </span>
              </td>
              <td
                className={`p-3 font-medium relative ${
                  balance[member] < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                <span
                  style={{ fontFamily: "IBM Plex Mono, monospace" }}
                  className={`px-2 py-1 rounded-md ${
                    balance[member] < 0 ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  ₹{(balance[member] ?? 0).toFixed(2)}
                </span>
              </td>
              <td
                className="p-3 text-gray-700 "
                style={{ fontFamily: "IBM Plex Mono, monospace" }}
              >
                ₹{(totalPaid[member] ?? 0).toFixed(2)}
              </td>
              <td
                className="p-3 text-gray-700"
                style={{ fontFamily: "IBM Plex Mono, monospace" }}
              >
                ₹{(totalSpent[member] ?? 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex items-center gap-3">
        <input
          type="text"
          name="name"
          value={newMember}
          onChange={handleChange}
          placeholder="Enter member name"
          className="border border-gray-300 p-2 rounded-md w-full shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          onClick={addMember}
          className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition font-medium"
        >
          Add
        </button>
      </div>

      {message && (
        <p className="text-red-500 bg-red-100 border border-red-400 rounded-md text-sm mt-3 p-2 text-center">
          {message}
        </p>
      )}
    </div>
  );
}
