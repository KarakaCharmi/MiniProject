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
  const { amount, whoPaid, checkedMembers, membersBill, purpose } =
    useBillContext();

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
      setTimeout(() => {
        navigate(`/explore/groups/${id}`);
      }, 1000);
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
    <div className="min-h-screen  max-w-4xl m-auto my-5 bg-[#deacsf]  text-[#28104E]">
      <div className="bg-gradient-to-r from-[#29294f] via-[#3a3a6e] to-[#51518d] text-white p-4  rounded-lg shadow-lg flex items-center justify-between sticky top-0 z-10 ">
        <button
          onClick={() => navigate(`/explore/groups/${id}`)}
          className="text-3xl font-bold bg-gradient-to-r from-[#9b3675] to-[#81346b] rounded-full shadow-md"
        >
          <HiArrowLeftCircle />
        </button>
        <h1 className="text-lg tracking-widest custom-font px-4 py-2 rounded-full bg-gradient-to-r from-[#9b3675] to-[#81346b] shadow-md">
          {purpose} Expenses
        </h1>
      </div>
      <div className="mt-10 ">
        <div className="border-b-purple-200 border-b-solid border-b-2 shadow-md pb-4 rounded-md pl-8">
          <div className="tracking-widest text-[#28104E] mb-6 pl-4 font-semibold text-lg">
            Details
          </div>
          <div className="bg-white px-4 rounded  flex">
            <label className="block tracking-wide basis-32 ">Purpose</label>
            <div className="grow ">
              <input
                className="ml-2 flex-1 border-b capitalize font-medium text-slate-500 border-gray-300 focus:outline-none w-full tracking-wider "
                value={purpose}
                disabled
                type="text"
              />
            </div>
          </div>

          <div className="flex mt-7">
            <div className="bg-white px-4 rounded  flex items-center  grow">
              <label className="block   basis-32 tracking-wider">Paid By</label>
              <div className="tracking-wider capitalize text-slate-800 ">
                <input
                  className="ml-2 flex-1 border-b border-gray-300 focus:outline-none  tracking-widest text-slate-500 capitalize font-medium"
                  value={whoPaid}
                  disabled
                  type="text"
                />
              </div>
            </div>

            <div className="bg-white  rounded flex items-center grow">
              <label className="block  basis-32 tracking-wider">Amount</label>
              <div className="tracking-wider capitalize text-slate-800 ">
                <input
                  className="ml-2 flex-1 border-b font-medium border-gray-300 focus:outline-none  tracking-widest text-slate-500 capitalize"
                  value={amount}
                  disabled
                  type="Number"
                />
              </div>
            </div>
          </div>

          <Modal>
            <Modal.Open opens="editPaid">
              <button className="text-white bg-gradient-to-r from-[#9b3675] to-[#81346b] font-semibold tracking-widest ml-4 mt-6 border px-4 py-1 rounded-full shadow-md">
                EDIT
              </button>
            </Modal.Open>
            <Modal.Window name="editPaid">
              <PayBill />
            </Modal.Window>
          </Modal>
        </div>
        <div className="bg-white px-6 rounded mb-4 shadow-md mt-6">
          <div className="text-[#28104E] text-lg tracking-widest font-semibold pl-4  ">
            Split the Expenses
          </div>
          <SplitBill />
        </div>
        <div className="text-right mb-4 mt-4">
          <button
            className="bg-gradient-to-r from-[#9b3675] to-[#81346b] text-white py-1 px-4 rounded-full tracking-widest mb-6"
            onClick={handleSaveTransaction}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
