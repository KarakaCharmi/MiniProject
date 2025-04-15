import Transaction from "./Transaction";
import { IoMdSwap } from "react-icons/io";

export default function Transactions({ transactions }) {
  return (
    <div className="bg-[#deacsf] p-4 rounded-lg  mb-4  ">
      <h2 className=" flex flex-start gap-4 font-bold text-[#28104E] font-Sans text-2xl  mb-4 tracking-wide">
        <IoMdSwap size={32} />
        Transactions
      </h2>
      <div className="divide-y-[0.75px] flex flex-col divide-[#e9e5ff]">
        {transactions.length === 0 ? (
          <div>There is no transactions yet...</div>
        ) : (
          transactions.map((item) => (
            <Transaction item={item} key={item.date} />
          ))
        )}
      </div>
    </div>
  );
}
