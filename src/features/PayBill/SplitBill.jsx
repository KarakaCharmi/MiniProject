import { useBillContext } from "./BillContextApi";
import SplitEqually from "./SplitEqually";
import SplitManually from "./SplitManually";

export default function SplitBill({ split }) {
  const { members } = useBillContext();
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <label className="block text-gray-600 mb-2">For whom</label>
      {split === "byAmounts" &&
        members.map((member, index) => (
          <SplitManually member={member} key={index} index={index} />
        ))}
      {split === "equally" &&
        members.map((member, index) => (
          <SplitEqually member={member} key={index} />
        ))}
    </div>
  );
}
