import Transaction from "./Transaction";
import { IoMdSwap } from "react-icons/io";

export default function Transactions({ transactions }) {
  return (
    <div className="bg-[#deacsf] p-4 rounded-lg  mb-4 divide-y-[0.5px] divide-[#deacsf]-300 ">
      <h2 className=" flex flex-start gap-2 text-bold text-cyan-700 font-Sans text-2xl  mb-2 ">
        <IoMdSwap size={32} />
        Transactions
      </h2>
      {transactions.length === 0 ? (
        <div>There is no transactions yet...</div>
      ) : (
        transactions.map((item) => <Transaction item={item} key={item.date} />)
      )}
    </div>
  );
}
