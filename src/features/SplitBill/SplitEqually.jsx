import { useState } from "react";
import { useBillContext } from "../../contextapi/BillContextApi";

function SplitEqually({ member }) {
  const {
    amount,
    numOfMembersChecked,
    handleCheckedMembers,
    handleSetChecked,
    checkedMembers,
  } = useBillContext();
  const [isChecked, setIsChecked] = useState(true);
  function handleChange(e) {
    setIsChecked((isChecked) => !isChecked);
    if (!e.target.checked) {
      handleCheckedMembers(numOfMembersChecked - 1);
      handleSetChecked(checkedMembers.filter((item) => item != member));
    } else {
      handleCheckedMembers(numOfMembersChecked + 1);
      handleSetChecked([...checkedMembers, member]);
    }
  }
  return (
    <div className="flex items-center mb-2">
      <div className="flex items-center gap-4 grow">
        <div className="shadow-md w-10 h-10 rounded-full bg-gradient-to-r from-[#9b3675] to-[#81346b] text-white flex items-center justify-center">
          {member[0].toUpperCase()}
        </div>
        <span className="ml-2 capitalize tracking-wider text-[#28104E]">
          {member
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      </div>
      <div className="flex items-center basis-96 justify-between">
        <span>₹ {isChecked ? amount / numOfMembersChecked : 0}</span>
        <input
          type="checkbox"
          className="ml-2 w-4 h-7 accent-slate-300 p-10 disabled:accent-slate-400"
          checked={isChecked}
          disabled={isChecked && numOfMembersChecked === 1}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
export default SplitEqually;
