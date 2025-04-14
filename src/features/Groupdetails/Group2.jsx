import { IoMdPeople } from "react-icons/io";
import { FiEdit, FiShare2 } from "react-icons/fi";
import Debts from "./Debts";
import RecentActivity from "./RecentActivity";
import TotalSpent from "./TotalSpent";
import Transactions from "./Transactions";
import Modal from "../../ui/Modal";
import PayBill from "../PayBill/PayBill";
import { useBillContext } from "../PayBill/BillContextApi";
import { useEffect } from "react";
import { useAuth } from "../../contextapi/UserAuth";
import { useParams } from "react-router-dom";

export default function GroupDetails() {
  const { id } = useParams();
  const { groups } = useAuth();
  const { setMembers } = useBillContext();

  if (!groups) {
    return <p className="text-center text-gray-600">Loading groups...</p>;
  }

  const group = groups.find((item) => item._id === id) || {};
  const {
    name = "Unknown Group",
    description = "No description available",
    transactions,
    members = [],
  } = group;

  useEffect(() => {
    if (members.length > 0) {
      setMembers(members);
    }
  }, [members, setMembers]);

  return (
    <div className="max-w-5xl mx-auto my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#29294f] via-[#3a3a6e] to-[#51518d] text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
        {/* Group Info */}
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-[#9b3675] to-[#81346b] p-3 rounded-full shadow-md">
            <IoMdPeople className="text-3xl text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">{name}</h1>
            <p className="text-lg italic opacity-80">&mdash; {description}</p>
          </div>
        </div>

        {/* Member Count Badge */}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="px-5 py-2 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-full shadow-lg flex items-center gap-2 border border-white/20">
            <IoMdPeople className="text-xl text-white" />
            <span>{members.length} Members</span>
          </div>

          <button className="bg-white/10 px-4 py-2 rounded-full shadow-md hover:bg-white/20 transition">
            <FiEdit className="text-lg" />
          </button>
          <button className="bg-white/10 px-4 py-2 rounded-full shadow-md hover:bg-white/20 transition">
            <FiShare2 className="text-lg" />
          </button>
        </div>
      </div>

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

      {/* Add Transaction Button */}
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
    </div>
  );
}
