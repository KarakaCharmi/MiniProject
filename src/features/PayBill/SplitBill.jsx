import { useBillContext } from "./BillContextApi";
import Member from "./Member";

export default function SplitBill() {
  const { members, numOfMembersChecked } = useBillContext();
  console.log(numOfMembersChecked);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <label className="block text-gray-600 mb-2">For whom</label>
      {members.map((member, index) => (
        <Member member={member} key={index} />
      ))}
    </div>
  );
}
