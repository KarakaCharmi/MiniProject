const ExpenseCircles = () => {
  // Sample data based on the image
  const members = [
    { name: "Charmi", amount: -10, status: "should pay" },
    { name: "la litha", amount: -465, status: "should pay" },
    { name: "Devi", amount: 275, status: "owed" },
  ];

  const transactions = [
    {
      description: "TRIP TO GOA",
      amount: 790,
      date: "Feb 27, 2025 4:14 PM",
      paidBy: "D",
    },
    {
      description: "Debt settlement",
      amount: 75,
      date: "Feb 27, 2025 4:12 PM",
      from: "Charmi",
    },
    {
      description: "Expense",
      amount: 200,
      date: "Feb 27, 2025 4:10 PM",
      paidBy: "Deekhi",
    },
  ];

  return (
    <div className="max-w-md mx-auto p-5 font-sans text-gray-800">
      {/* Members Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Members</h2>
        <div className="flex flex-wrap gap-5">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col items-center w-24">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center font-bold mb-2 
                ${
                  member.amount < 0
                    ? "bg-red-50 text-red-800 border-2 border-red-200"
                    : "bg-green-50 text-green-800 border-2 border-green-200"
                }`}
              >
                <span className="text-lg">¥{Math.abs(member.amount)}</span>
              </div>
              <div className="text-center">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-xs text-gray-500">{member.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Section */}
      <div className="border-t border-dashed border-gray-300 pt-5">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="pb-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{transaction.description}</h3>
                <span className="font-bold">¥{transaction.amount}</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                <div>{transaction.date}</div>
                {transaction.paidBy && (
                  <div>More members paid for {transaction.paidBy}</div>
                )}
                {transaction.from && <div>From {transaction.from} to</div>}
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-full py-2 mt-5 border border-gray-300 rounded-md font-bold text-gray-600 
                         hover:bg-gray-50 uppercase text-sm"
        >
          SHOW ALL
        </button>
      </div>
    </div>
  );
};

export default ExpenseCircles;
