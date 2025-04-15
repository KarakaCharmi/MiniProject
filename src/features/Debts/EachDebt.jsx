import { HiArrowLongRight } from "react-icons/hi2";

export default function EachDebt({ from, to, amount }) {
  return (
    <div className="transition duration-700 ease-in-out text-[#28104E] text-md tracking-wide">
      <div className="grid grid-cols-3 gap-4 items-center px-4 py-1 text-[16.5px] tracking-wider">
        {/* Column 1: From */}
        <div className="text-left capitalize">{from}</div>

        {/* Column 2: Arrow Icon */}
        <div className="flex justify-center">
          <HiArrowLongRight className="text-gray-500" />
        </div>

        {/* Column 3: To and Amount */}
        <div className="text-right">
          <div className="capitalize">{to}</div>
          <div className=" text-[16.5px] font-bold tracking-wide">₹ {amount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
