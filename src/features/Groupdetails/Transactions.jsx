import Transaction from "./Transaction";

export default function Transactions({ transactions }) {
  return (
    <div className="bg-cyan-50 p-4 rounded-lg shadow-md mb-4 divide-y-2 divide-cyan-300 ">
      <h2 className="text-gray-600 mb-2">Transactions</h2>
      {transactions.length === 0 ? (
        <div>There is no transactions yet...</div>
      ) : (
        transactions.map((item) => <Transaction item={item} key={item.date} />)
      )}
    </div>
  );
}
