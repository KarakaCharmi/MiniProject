import { HiArrowLeftCircle, HiChevronDown } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import PayBill from "./PayBill";
import SplitBill from "../SplitBill/SplitBill";
import { useBillContext } from "../../contextapi/BillContextApi";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:5000";

export default function AddingNewExpense() {
  const { amount, whoPaid, checkedMembers, membersBill } = useBillContext();
  const [purpose, setPurpose] = useState("");
  const [selectedOption, setSelectedOption] = useState("equally");
  const navigate = useNavigate();
  const { id } = useParams();

  //Event Handler

  async function handleSaveTransaction() {
    let eachMemberBill = membersBill.map((memberBill) => Number(memberBill));

    let splitBetween = checkedMembers;

    if (eachMemberBill.reduce((sum, bill) => sum + bill, 0) !== 0) {
      splitBetween = splitBetween.filter(
        (member, index) => eachMemberBill[index] !== 0
      );

      eachMemberBill = eachMemberBill.filter((bill) => bill !== 0);
    }
    const newTransaction = {
      amount: amount,
      paidBy: whoPaid,
      splitBetween,
      category: purpose,
      amountSplits: eachMemberBill,
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
  const options = [
    { value: "equally", label: "Split Equally" },
    { value: "byAmounts", label: "Split by Amounts" },
  ];
  return (
    <div className="min-h-screen  max-w-4xl m-auto my-5 bg-[#deacsf] shadow-md">
      <div className="bg-gradient-to-r from-[#29294f] via-[#3a3a6e] to-[#51518d] text-white p-6 rounded-lg shadow-lg flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => navigate(`/explore/groups/${id}`)}
          className="text-3xl font-bold bg-gradient-to-r from-[#9b3675] to-[#81346b] rounded-full shadow-md"
        >
          <HiArrowLeftCircle />
        </button>
        <h1 className="text-xl tracking-wider custom-font ">New expense</h1>
      </div>
      <div className="p-4">
        <div className="bg-white p-4 rounded mt-4 flex">
          <label className="block text-slate-950  tracking-wide basis-32 ">
            Purpose
          </label>
          <div className="grow mb-4 ">
            <input
              className="ml-2 flex-1 border-b border-gray-300 focus:outline-none w-full tracking-wider text-slate-800"
              placeholder="Example: Peanut butter"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              type="text"
            />
          </div>
        </div>
        <div></div>
        <div className="bg-white p-4 rounded  flex items-center">
          <label className="block text-slate-950  basis-32 tracking-wider">
            Paid By
          </label>
          <div className="tracking-wider capitalize p-2 text-slate-800 ">
            <input
              className="ml-2 flex-1 border-b border-gray-300 focus:outline-none  tracking-widest text-slate-800 capitalize"
              value={whoPaid}
              disabled
              type="text"
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded mb-4 flex items-center">
          <label className="block text-slate-950 mb-2  basis-32 tracking-wider">
            Amount
          </label>
          <div className="mb-4 tracking-wider capitalize p-2 text-slate-800 ">
            <input
              className="ml-2 flex-1 border-b border-gray-300 focus:outline-none  tracking-widest text-slate-800 capitalize"
              value={amount}
              disabled
              type="Number"
            />
          </div>
        </div>
        <Modal>
          <Modal.Open opens="editPaid">
            <button className="text-blue-500">EDIT</button>
          </Modal.Open>
          <Modal.Window name="editPaid">
            <PayBill />
          </Modal.Window>
        </Modal>
        <div className="bg-white p-4 rounded shadow mb-4">
          <div className="flex items-center justify-between gap-10">
            <div className="text-slate-700">SELECT SPLIT OPTION:</div>
            <div className=" grow relative">
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full px-4 py-2  pr-8 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none 
                  appearance-none transition duration-150 ease-in-out "
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-3 text-xl font-bold">
                <HiChevronDown />
              </div>
            </div>
          </div>
        </div>
        {selectedOption === "equally" && <SplitBill split="equally" />}
        {selectedOption === "byAmounts" && <SplitBill split="byAmounts" />}
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
