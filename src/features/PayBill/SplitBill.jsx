import { useBillContext } from "./BillContextApi";
import Member from "./SplitManually";

export default function SplitBill() {
  const { members } = useBillContext();
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <label className="block text-gray-600 mb-2">For whom</label>
      {members.map((member, index) => (
        <Member member={member} key={index} index={index} />
      ))}
    </div>
  );
}
