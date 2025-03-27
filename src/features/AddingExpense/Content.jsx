import { useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDrop";
import CustomDrop from "./CustomDrop";
import { useBillContext } from "../../contextapi/BillContextApi";
import FileUpload from "./FileUpload";
import useReceipt from "./Receipt";
import { set } from "mongoose";
import Receipt from "./Receipt";
import { HiArrowRight } from "react-icons/hi2";
function Content() {
  const {
    amount,
    purpose,
    setPurpose,
    totalAmount,
    whoPaid,
    whoPaidBill,
    members,
    amountOrReceipt,
    fileName,
    receiptLoading,
  } = useBillContext();
  const navigate = useNavigate();
  //const { isLoading, totalAmount: receiptAmount } = useReceipt();
  //Eventhandlers

  function handleClick() {
    //totalAmount(receiptAmount);
    navigate("newExpense");
  }
  return (
    <div className="rounded-xl relative mt-2">
      <div className="flex items-center p-4 mt-2 gap-4">
        <div className="min-w-[6.8rem] text-gray-700 font-medium">Purpose</div>
        <div className="grow">
          <input
            type="text"
            className="px-2 py-1 w-full outline-1 outline-purple-400 rounded-lg border-1 border border-purple-300 "
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Example: Peanut butter"
          />
        </div>
      </div>
      <div className="flex items-center p-4 mt-2 rounded-md gap-4">
        <div className="min-w-[6.8rem] text-gray-700 font-medium">
          Who paid??
        </div>
        <div className="grow">
          <CustomDrop
            options={members}
            value={whoPaid}
            changeHandler={whoPaidBill}
          />
        </div>
      </div>
      {amountOrReceipt === "New Expenses" ? (
        <div className="flex p-4 mt-2 gap-4 items-center">
          <label
            htmlFor="amount"
            className="min-w-[6.8rem] text-gray-700 font-medium "
          >
            Paid Amount:
          </label>
          <input
            value={amount}
            onChange={(e) => totalAmount(e.target.value)}
            id="amount"
            className="px-2 py-1 w-full outline-1 outline-purple-400 rounded-lg border border-purple-300 border-1 "
          />
        </div>
      ) : (
        <>
          <FileUpload />
          {fileName !== "" && <Receipt />}
        </>
      )}
      <div className="mt-4">
        <button
          className="px-4 py-2  rounded-full bg-purple-600 text-white shadow-md tracking-widest font-medium text-md flex gap-3 items-center ml-auto"
          onClick={handleClick}
          disabled={receiptLoading}
        >
          <span>Next</span> <HiArrowRight />
        </button>
      </div>
    </div>
  );
}
export default Content;
