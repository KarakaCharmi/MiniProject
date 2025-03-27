import Transaction from "./Transaction";

export default function Transactions({ transactions }) {
  return (
    <div className="bg-[#deacsf] p-4 rounded-lg  mb-4 divide-y-[0.5px] divide-[#deacsf]-300 ">
      <h2 className="text-[#28104E] mb-2 ">Transactions</h2>
      {transactions.length === 0 ? (
        <div>There is no transactions yet...</div>
      ) : (
        transactions.map((item) => <Transaction item={item} key={item.date} />)
      )}
    </div>
  );
}
