import { HiArrowLongRight } from "react-icons/hi2";

export default function EachDebt({ from, to, amount }) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center py-2 px-3">
      {/* Column 1: From */}
      <div className="text-left font-bold">{from}</div>

      {/* Column 2: Arrow Icon */}
      <div className="flex justify-center">
        <HiArrowLongRight className="text-gray-500" />
      </div>

      {/* Column 3: To and Amount */}
      <div className="text-right">
        <div className="font-bold">{to}</div>
        <div className="text-gray-500 text-sm">{amount}</div>
      </div>
    </div>
  );
}
