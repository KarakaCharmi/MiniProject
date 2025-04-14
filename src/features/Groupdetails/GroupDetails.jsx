import { IoMdPeople } from "react-icons/io";
import { FiEdit, FiShare2, FiX } from "react-icons/fi";
import Debts from "../Debts/Debts";
import RecentActivity from "../RecentActivity/RecentActivity";
import TotalSpent from "../TotalSpent/TotalSpent";
import Transactions from "../Transactions/Transactions";
import Modal from "../../ui/Modal";
import PayBill from "../AddingExpense/PayBill";
import { useBillContext } from "../../contextapi/BillContextApi";
import { useEffect, useState } from "react";
import { useAuth } from "../../contextapi/UserAuth";
import { useParams } from "react-router-dom";
import { HiMiniMicrophone } from "react-icons/hi2";
import PayBillVoice from "../AddingExpense/PayBillVoice";

export default function GroupDetails() {
  const { id } = useParams();
  const { groups, updateGroupNameAndDescription } = useAuth();
  const { setMembers } = useBillContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!groups || groups.length === 0) {
    return <p className="text-center  text-gray-600">Loading groups...</p>;
  }

  const group = groups.find((item) => item._id === id) || {};
  const {
    name = "Unknown Group",
    description = "No description available",
    transactions = [],
    members = [],
  } = group;

  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);

  useEffect(() => {
    if (members.length > 0) {
      setMembers(members);
    }
  }, [members, setMembers]);

  const handleSave = () => {
    updateGroupNameAndDescription(id, newName, newDescription);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto my-2">
      {/* Header */}
      <div className="bg-[#9A7DCE] backdrop-blur-3xl bg-opacity-70 text-white p-6 rounded-lg shadow-lg flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="bg-white border-zinc-600 border-2 p-2 rounded-full shadow-md">
            <img
              src="https://img.icons8.com/?size=100&id=40730&format=png&color=000000"
              alt="Travel Icon"
              className="w-8 h-8"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#eb5f76]/80">
              {name}
            </h1>
            <p className="text-lg italic font-[cursive] font-bold text-[#090a0a]">
              &mdash; {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-5 py-2 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-full shadow-lg flex items-center gap-2 border border-white/20">
            <IoMdPeople className="text-xl text-white" />
            <span>{members.length} Members</span>
          </div>

          <button
            className="bg-[#FFFFFF1A] px-4 py-2 rounded-full shadow-md hover:bg-[#FFFFFF33] transition"
            onClick={() => {
              setNewName(name);
              setNewDescription(description);
              setIsModalOpen(true);
            }}
          >
            <FiEdit className="text-lg" />
          </button>

          <button className="bg-[#FFFFFF1A] px-4 py-2 rounded-full shadow-md hover:bg-[#FFFFFF33] transition">
            <FiShare2 className="text-lg" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
    <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] text-white p-8 rounded-2xl w-full max-w-xl mx-4 shadow-2xl relative scale-95 animate-scaleIn">
      
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition-transform hover:scale-125"
        onClick={() => setIsModalOpen(false)}
        aria-label="Close modal"
      >
        <FiX className="text-3xl" />
      </button>

      {/* Header */}
      <h3 className="text-3xl font-bold mb-6 text-center text-cyan-400 tracking-wide">
        ✨ Edit Group Info
      </h3>

      {/* Form */}
      <div className="space-y-6">
        <input
          type="text"
          className="w-full bg-[#1e293b] border border-[#334155] p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Group Name"
        />
        <textarea
          className="w-full bg-[#1e293b] border border-[#334155] p-3 rounded-xl text-white outline-none resize-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Group Description"
          rows={4}
        />
        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all px-5 py-3 rounded-xl w-full font-semibold text-lg shadow-lg hover:shadow-2xl"
          onClick={handleSave}
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  </div>
)}


      {/* Transactions Section */}
      {transactions.length === 0 ? (
        <div className="p-6 text-center bg-gray-100 text-gray-600 mt-4 rounded-lg shadow-md">
          No transactions yet...!
        </div>
      ) : (
        <div className="p-6 mt-4 bg-gray-100 rounded-lg shadow-md">
          <Transactions transactions={transactions} />
          <Debts transactions={transactions} />
          <TotalSpent transactions={transactions} />
          <RecentActivity />
        </div>
      )}

      {/* Add Expense Buttons */}
      <Modal>
        <Modal.Open opens="payBill">
          <button className="fixed right-8 bottom-10 bg-[#6A1E55] text-white px-6 py-3 rounded-full shadow-lg font-bold text-xl hover:shadow-2xl">
            +
          </button>
        </Modal.Open>
        <Modal.Window name="payBill">
          <PayBill />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open opens="payBillVoice">
          <button className="fixed left-8 bottom-10 bg-[#6A1E55] text-white px-6 py-3 rounded-full shadow-lg font-bold text-xl hover:shadow-2xl">
            <HiMiniMicrophone />
          </button>
        </Modal.Open>
        <Modal.Window name="payBillVoice">
          <PayBillVoice />
        </Modal.Window>
      </Modal>
    </div>
  );
}
