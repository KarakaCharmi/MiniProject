import { useEffect, useState } from "react";
import { useBillContext } from "./BillContextApi";

function Member({ member }) {
  const { amount, numOfMembersChecked, handleCheckedMembers, numOfMembers } =
    useBillContext();
  const [isChecked, setIsChecked] = useState(true);
  console.log("checking", numOfMembers, numOfMembersChecked);
  useEffect(
    function () {
      /* if (numOfMembersChecked <= 0) {
        window.alert("Amount must be shared by atleat 1 person");
      } */
      if (!isChecked) {
        handleCheckedMembers(numOfMembersChecked - 1);
      } else {
        handleCheckedMembers(numOfMembersChecked + 1);
      }
    },
    [isChecked]
  );
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
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
      <span>₹ {isChecked ? amount / numOfMembersChecked : 0}</span>
      <input
        type="checkbox"
        className="ml-2"
        checked={isChecked}
        disabled={numOfMembersChecked === 1}
        onChange={() => setIsChecked(!isChecked)}
      />
    </div>
  );
}
export default Member;
