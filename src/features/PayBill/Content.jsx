import { useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDrop";
import CustomDrop from "./CustomDrop";
import { useBillContext } from "./BillContextApi";

function Content() {
  const {
    amount,
    totalAmount,
    whoPaid,
    whoPaidBill,
    currency,
    settingCurrency,
    members,
  } = useBillContext();
  const navigate = useNavigate();
  return (
    <div className="rounded-xl relative">
      <div className="flex items-center p-4 mt-5 rounded-md gap-4">
        <div className="min-w-[6.5rem]">Who paid??</div>
        <div className="grow">
          <CustomDrop
            options={members}
            value={whoPaid}
            changeHandler={whoPaidBill}
          />
        </div>
      </div>

      <div className="flex p-4 mt-5 gap-4 items-center">
        <label htmlFor="amount" className="min-w-[6.5rem]">
          Paid Amount
        </label>
        <input
          value={amount}
          onChange={(e) => totalAmount(e.target.value)}
          id="amount"
          className="px-4 py-2 ml-2 border-purple-300 border-solid border-[3px] rounded-xl outline-purple-300 bg-purple-100
        "
        />
        <CustomDropdown
          options={["INR", "USD", "END"]}
          value={currency}
          changeHandler={settingCurrency}
        />
      </div>

      <div
        className="bg-purple-400 text-white text-center p-4 text-xl mt-10 rounded-b-xl flex gap-4 justify-center"
        onClick={() => navigate("newExpense")}
      >
        <span className="tracking-widest text-2xl">NEXT</span>{" "}
        <i className="fas fa-arrow-right text-2xl"></i>
      </div>
    </div>
  );
}
export default Content;
