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
import { FaPlus } from "react-icons/fa6";
export default function GroupDetails() {
  const { id } = useParams();
  const { groups, updateGroupNameAndDescription } = useAuth();
  const { setMembers } = useBillContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  if (!groups || groups.length === 0) {
    return <p className="text-center text-gray-600">Loading groups...</p>;
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
    <div className="max-w-[90%] mx-auto my-2 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29294f] via-[#3a3a6e] to-[#51518d] text-white p-6 rounded-lg shadow-lg flex justify-between items-center ">
        {" "}
        <div className="flex items-center gap-4">
          <div className="bg-white border-zinc-600 border-2 p-2 rounded-full shadow-md">
            <img
              src="https://img.icons8.com/?size=100&id=40730&format=png&color=000000"
              alt="Travel Icon"
              className="w-8 h-8"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white tracking-wider">
              {name}
            </h1>
            <p className="text-lg italic font-[cursive] text-white tracking-wider">
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
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] text-white p-8 rounded-2xl w-full max-w-xl mx-4 shadow-2xl relative scale-95 animate-scaleIn">
            <button
              className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition-transform hover:scale-125"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <FiX className="text-3xl" />
            </button>

            <h3 className="text-3xl font-bold mb-6 text-center text-cyan-400 tracking-wide">
              ✨ Edit Group Info
            </h3>

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
        <div className="p-6 mt-4 bg-gray-100 rounded-lg shadow-md ">
          <Transactions transactions={transactions} />
          <Debts transactions={transactions} />
          <TotalSpent transactions={transactions} />
          <RecentActivity />
        </div>
      )}

      {/* Add Expense Buttons */}
      {isOpen && (
        <>
          {/* <Modal>
            <Modal.Open opens="payBillVoice">
              <button className="fixed right-8 bottom-28 bg-[#6A1E55] text-white p-6 rounded-full shadow-lg hover:shadow-2xl z-20">
                <HiMiniMicrophone className="text-2xl" />
              </button>
            </Modal.Open>
            <Modal.Window name="payBillVoice">
              <PayBillVoice />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="payBill">
              <button className="fixed right-8 bottom-40 bg-[#6A1E55] text-white p-6 rounded-full shadow-lg hover:shadow-2xl z-20">
                <FaPlus className="text-2xl" />
              </button>
            </Modal.Open>
            <Modal.Window name="payBill">
              <PayBill />
            </Modal.Window>
          </Modal> */}
          <Modal>
            <Modal.Open opens="payBillVoice">
              <div className="group">
                <button className="fixed right-8 bottom-32 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-5 rounded-full shadow-xl hover:scale-105 transition-transform z-20">
                  <HiMiniMicrophone className="text-2xl" />
                </button>
                <span className="fixed right-20 bottom-36 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Add Voice Command
                </span>
              </div>
            </Modal.Open>
            <Modal.Window name="payBillVoice">
              <PayBillVoice />
            </Modal.Window>
          </Modal>

          {/* Add Expense Button */}
          <Modal>
            <Modal.Open opens="payBill">
              <div className="group">
                <button className="fixed right-8 bottom-52 bg-gradient-to-r from-pink-600 to-red-500 text-white p-5 rounded-full shadow-xl hover:scale-105 transition-transform z-20">
                  <FaPlus className="text-2xl" />
                </button>
                <span className="fixed right-20 bottom-56 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Add Expense
                </span>
              </div>
            </Modal.Open>
            <Modal.Window name="payBill">
              <PayBill opens="addExpense" />
            </Modal.Window>
          </Modal>
        </>
      )}

      <button
        onClick={toggleMenu}
        className={`fixed right-8 bottom-10 ${
          isOpen
            ? "bg-amber-500 text-white"
            : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
        } p-4 px-6 rounded-full shadow-lg font-bold text-4xl hover:scale-110 transition-transform z-30`}
      >
        {isOpen ? "×" : "+"}
      </button>
    </div>
  );
}
