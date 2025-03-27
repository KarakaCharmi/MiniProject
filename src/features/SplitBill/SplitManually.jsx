import { useState } from "react";
import { useBillContext } from "../../contextapi/BillContextApi";

function SplitManually({ member, index }) {
  const { amount, membersBill } = useBillContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [memberAmount, setMemberAmount] = useState("");
  const [billSum, setBillSum] = useState(0);

  function handleAmountChange(e) {
    const a = e.target.value;
    const sumOfMembersBill = membersBill.reduce(
      (acc, cur) => acc + Number(cur),
      0
    );
    setBillSum(sumOfMembersBill);
    if (sumOfMembersBill - Number(membersBill[index]) + Number(a) === amount) {
      setMemberAmount(a);
      membersBill[index] = a;
      return;
    }
    if (sumOfMembersBill - Number(membersBill[index]) + Number(a) > amount) {
      setMemberAmount(a.slice(0, -1));
      if (a < 10) {
        setMemberAmount("");
      }
      setIsDisabled(true);
      return;
    }
    membersBill[index] = a;
    setMemberAmount(a);
  }
  return (
    <div className="flex items-center mb-2">
      <div className="flex items-center grow gap-4">
        <div className="shadow-md w-10 h-10 rounded-full bg-gradient-to-r from-[#9b3675] to-[#81346b] text-white flex items-center justify-center">
          {member[0].toUpperCase()}
        </div>
        <span className="ml-2 text-[#28104E] tracking-wider">
          {member
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute text-sm top-3 text-slate-600">
          ₹
        </div>
        <input
          type="text"
          placeholder="Ex: 0"
          className="peer px-4 py-2 border-b-2 border-gray-300 outline-none text-slate-600"
          onChange={handleAmountChange}
          disabled={isDisabled && memberAmount == 0 && billSum === amount}
          value={memberAmount}
        />
      </div>
    </div>
  );
}
export default SplitManually;
