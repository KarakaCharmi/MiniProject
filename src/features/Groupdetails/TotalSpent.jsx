import { useParams } from "react-router-dom";
import { useAuth } from "../../contextapi/UserAuth";

export default function TotalSpent() {
  const { groups } = useAuth();
  const { id } = useParams();

  if (groups.length === 0) return <div>Debts Loadings....</div>;
  //finding Group with id

  const { name, transactions } = groups.find((group) => group._id === id);
  console.log(transactions);
  const total = transactions.reduce((acc, current) => {
    return acc + current.amount;
  }, 0);
  return (
    <div className="bg-cyan-50 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-gray-600 mb-2">Total spent</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-cyan-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="ml-4">
            <h3 className="font-bold">Total money spent for {name}</h3>
          </div>
        </div>
        <p className="text-cyan-900 font-bold">₹{total}</p>
      </div>
    </div>
  );
}
