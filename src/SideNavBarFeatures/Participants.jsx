import { useParams } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";
import { useState } from "react";
import { getDebts } from "../utils/getDebts";
import { getBalance } from "../utils/getBalance";
import { toast } from "react-toastify";
import axios from "axios";
import ExpenseCircles from "./ExpenseCircles";

export default function GroupMembers() {
  const { groups, updateGroupMembers } = useAuth();
  const { id } = useParams();
  const group = groups.find((item) => item._id === id) || {};
  const { members: groupMembers, transactions, emails } = group;
  const [members, setMembers] = useState(groupMembers || []);
  const [newMember, setNewMember] = useState("");
  const [message, setMessage] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const [sendingNotifications, setSendingNotifications] = useState({});

  const debts = getDebts({ members: groupMembers, transactions });
  const { totalPaid, totalSpent, balance, EmailBalance } = getBalance({
    members: groupMembers,
    transactions,
    emails,
    debts,
  });

  function handleChange(e) {
    setNewMember(e.target.value);
  }

  async function addMember() {
    if (!newMember.trim() || !newMemberEmail) {
      setMessage("Please Enter Both the Fields");
      setMessage("");
      return;
    }
    if (
      members.some(
        (member) => member.toLowerCase() === newMember.toLowerCase()
      ) ||
      emails.some(
        (email) => email.toLowerCase() === newMemberEmail.toLowerCase()
      )
    ) {
      setMessage("Either Member or Email already exists");
      setNewMember("");
      setNewMemberEmail("");
      return;
    }

    const updatedMembers = [...members, newMember];
    const updatedEmails = [...emails, newMemberEmail];

    try {
      const response = await fetch(
        `http://localhost:5000/groups/${id}/members`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            members: updatedMembers,
            emails: updatedEmails,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update members");

      // Update local state
      setMembers(updatedMembers);
      setNewMember("");
      setMessage("");

      // Update global context (VERY IMPORTANT)
      updateGroupMembers(id, updatedMembers, updatedEmails);

      console.log("Member added successfully!");
    } catch (error) {
      console.error("Error updating members:", error);
      alert("Failed to add member. Please try again.");
    }
  }
  // Function to handle sending notification to a specific member
  const handleNotifyMember = async (memberEmail, member) => {
    console.log(
      "membee email,member",
      memberEmail,
      member,
      EmailBalance[memberEmail]
    );
    try {
      setSendingNotifications((prev) => ({ ...prev, [member]: true }));

      const response = await axios.post(
        `http://localhost:5000/groups/${id}/notify-member`,
        {
          email: memberEmail,
          amountOwed: EmailBalance[memberEmail] || 0,
        }
      );

      toast.success(`Notification sent to ${member}`);
    } catch (error) {
      toast.error(`Failed to notify ${member}`);
      console.error("Notification error:", error);
    } finally {
      setSendingNotifications((prev) => ({ ...prev, [member]: false }));
    }
  };

  // Function to handle sending notification to all members with negative balance
  const handleNotifyAllDebtors = async () => {
    try {
      setSendingNotifications((prev) => ({ ...prev, all: true }));

      const debtors = members.filter((member) => (balance[member] || 0) < 0);
      if (debtors.length === 0) {
        toast.info("No members with outstanding debts");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/groups/${id}/notify-debts`
      );
      toast.success(`Notifications sent to ${debtors.length} members`);
    } catch (error) {
      toast.error("Failed to send notifications");
      console.error("Notification error:", error);
    } finally {
      setSendingNotifications((prev) => ({ ...prev, all: false }));
    }
  };

  // ... keep your existing handleChange and addMember functions ...

  return (
    <div className="bg-white mt-2 p-6 rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Group Members</h2>
        <button
          onClick={handleNotifyAllDebtors}
          disabled={sendingNotifications.all}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition font-medium disabled:bg-blue-400"
        >
          {sendingNotifications.all ? "Sending..." : "Notify All Debtors"}
        </button>
      </div>

      <p className="text-teal-500 font-sans text-sm mb-4">
        Manage members, assign roles, and invite new users
      </p>

      <table className="w-full border-collapse rounded-md overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
            <th className="p-3 pl-6 text-left">Name</th>
            <th className="p-3 text-left">Balance</th>
            <th className="p-3 text-left">Money Paid</th>
            <th className="p-3 text-left">Money Spent</th>
            <th className="p-3 text-left">Notify</th>
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
                <span className="font-medium text-gray-800">{member}</span>
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
                className="p-3 text-gray-700"
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

              <td className="p-3">
                <button
                  onClick={() => handleNotifyMember(emails[index], member)}
                  disabled={
                    sendingNotifications[member] || (balance[member] || 0) >= 0
                  }
                  className={`px-3 py-1 rounded-md text-sm ${
                    (balance[member] || 0) < 0
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {sendingNotifications[member] ? "Sending..." : "Notify"}
                </button>
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
          className="border border-gray-300 p-2 rounded-md w-full shadow-sm tracking-widest outline-[0.5px] outline-slate-600 text-slate-800"
        />
        <input
          type="text"
          name="email"
          value={newMemberEmail}
          onChange={(e) => setNewMemberEmail(e.target.value)}
          placeholder="Enter member Email"
          className="border border-gray-300 p-2 rounded-md w-full shadow-sm tracking-widest outline-[0.5px] outline-slate-600 text-slate-800"
        />
        <button
          onClick={addMember}
          className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition font-medium tracking-widest"
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
