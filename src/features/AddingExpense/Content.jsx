import { useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDrop";
import CustomDrop from "./CustomDrop";
import { useBillContext } from "../../contextapi/BillContextApi";
import FileUpload from "./FileUpload";
import useReceipt from "./Receipt";
import { set } from "mongoose";
import Receipt from "./Receipt";
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
      <button
        className={`bg-purple-400 text-white text-center p-4 text-xl mt-10 rounded-b-xl flex gap-4 justify-center cursor-pointer w-full disabled:cursor-not-allowed`}
        onClick={handleClick}
        disabled={receiptLoading}
      >
        <span className="tracking-widest text-2xl">NEXT</span>
        <i className="fas fa-arrow-right text-2xl"></i>
      </button>
    </div>
  );
}
export default Content;
