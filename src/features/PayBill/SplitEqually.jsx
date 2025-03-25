import { useState } from "react";
import { useBillContext } from "./BillContextApi";

function Member({ member }) {
  const {
    amount,
    numOfMembersChecked,
    handleCheckedMembers,
    numOfMembers,
    handleSetChecked,
    checkedMembers,
  } = useBillContext();
  const [isChecked, setIsChecked] = useState(true);
  console.log("checking", numOfMembers, numOfMembersChecked);
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
      <div className="flex items-center grow">
        <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center">
          {member[0].toUpperCase()}
        </div>
        <span className="ml-2">
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
          className="ml-2 w-4 h-6 accent-slate-300 p-4 disabled:accent-slate-400"
          checked={isChecked}
          disabled={isChecked && numOfMembersChecked === 1}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
export default Member;
