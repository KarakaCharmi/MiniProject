import { HiArrowLeftCircle } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import PayBill from "./PayBill";
import SplitBill from "./SplitBill";
import { useBillContext } from "./BillContextApi";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:5000";

export default function AddingNewExpense() {
  const { amount, whoPaid, checkedMembers, membersBill } = useBillContext();
  const [purpose, setPurpose] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //Event Handler

  async function handleSaveTransaction() {
    console.log("memberbill", membersBill);
    const newTransaction = {
      amount: amount,
      paidBy: whoPaid,
      splitBetween: checkedMembers,
      category: purpose,
    };

    try {
      const response = await axios.post(
        `${API_URL}/groups/${id}/transactions`,
        newTransaction
      );
      toast.success("Expense added successfully!", { autoClose: 1000 });
      setTimeout(() => navigate("/explore/groups"), 1000);
    } catch (error) {
      toast.error("Error in adding expense, Please try again.");
      console.error("API Error:", error);
    }
  }
  return (
    <div className="bg-gray-100 min-h-screen  max-w-4xl m-auto my-5">
      <div className="bg-fuchsia-800 text-white p-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/explore/groups")}
          className="text-3xl font-bold"
        >
          <HiArrowLeftCircle />
        </button>
        <h1 className="text-xl custom-font">New expense</h1>
      </div>
      <div className="p-4">
        <div className="bg-white p-4 rounded shadow mb-4">
          <label className="block text-gray-600 mb-2">Purpose</label>
          <div className="flex items-center mb-4">
            <i className="fas fa-ban text-gray-400"></i>
            <input
              className="ml-2 flex-1 border-b border-gray-300 focus:outline-none"
              placeholder="e.g. Peanut butter"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              type="text"
            />
          </div>
          <button className="flex items-center text-blue-500">
            <i className="fas fa-receipt text-blue-500"></i>
            <span className="ml-2">ADD RECEIPT PHOTO</span>
          </button>
        </div>
        <div className="bg-white p-4 rounded shadow mb-4">
          <label className="block text-gray-600 mb-2">Who paid</label>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
                I
              </div>
              <span className="ml-2">{whoPaid}</span>
            </div>
            <span className="text-orange-500">{amount}</span>
          </div>
          <Modal>
            <Modal.Open opens="editPaid">
              <button className="text-blue-500">EDIT</button>
            </Modal.Open>
            <Modal.Window name="editPaid">
              <PayBill />
            </Modal.Window>
          </Modal>
        </div>
        <SplitBill />
        <button className="text-blue-500 mb-4">SPLIT BY AMOUNTS</button>
        <button
          className="bg-fuchsia-700 text-white w-full py-2 rounded"
          onClick={handleSaveTransaction}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
