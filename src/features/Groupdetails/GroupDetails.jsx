import { IoMdPeople } from "react-icons/io";
import { FiEdit, FiShare2 } from "react-icons/fi";
import Debts from "../Debts/Debts";
import RecentActivity from "../RecentActivity/RecentActivity";
import TotalSpent from "../TotalSpent/TotalSpent";
import Transactions from "../Transactions/Transactions";
import Modal from "../../ui/Modal";
import PayBill from "../AddingExpense/PayBill";
import { useBillContext } from "../../contextapi/BillContextApi";
import { useEffect } from "react";
import { useAuth } from "../../contextapi/UserAuth";
import { useParams } from "react-router-dom";
import { HiMiniMicrophone } from "react-icons/hi2";
import PayBillVoice from "../AddingExpense/PayBillVoice";

export default function GroupDetails() {
  const { id } = useParams();
  const { groups } = useAuth();
  const { setMembers } = useBillContext();

  if (!groups || groups.length === 0) {
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
    <div className="max-w-5xl mx-auto my-2">
      {/* Header */}
      <div className="bg-[#9A7DCE] backdrop-blur-3xl bg-opacity-70 text-white p-6 rounded-lg shadow-lg flex justify-between items-center sticky top-0 z-50">
        {/* Group Info */}
        <div className="flex items-center gap-4">
          <div className="bg-white  border-zinc-600 border-2 p-2 rounded-full shadow-md">
            <img
              src="https://img.icons8.com/?size=100&id=40730&format=png&color=000000"
              alt="Travel Icon"
              className="w-8 h-8"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#eb5f76]/80 drop-shadow-[0_0_5px_#] ">
              {name}
            </h1>

            <p className="text-lg italic font-[cursive] font-bold   text-[#090a0a]">
              &mdash; {description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="px-5 py-2 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-full shadow-lg flex items-center gap-2 border border-white/20">
            <IoMdPeople className="text-xl text-white" />
            <span>{members.length} Members</span>
          </div>

          <button className="bg-[#FFFFFF1A] px-4 py-2 rounded-full shadow-md hover:bg-[#FFFFFF33] transition">
            <FiEdit className="text-lg" />
          </button>
          <button className="bg-[#FFFFFF1A] px-4 py-2 rounded-full shadow-md hover:bg-[#FFFFFF33] transition">
            <FiShare2 className="text-lg" />
          </button>
        </div>
      </div>

      {/* Transactions Section */}
      {transactions.length === 0 ? (
        <div className="p-6 text-center bg-gray-100 text-gray-600 mt-4 rounded-lg shadow-md ">
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
