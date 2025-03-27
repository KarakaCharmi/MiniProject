import { useParams } from "react-router-dom";
import { useAuth } from "../../contextapi/UserAuth";

export default function TotalSpent() {
  const { groups } = useAuth();
  const { id } = useParams();

  if (groups.length === 0) return <div>Debts Loadings....</div>;
  //finding Group with id

  const { name, transactions } = groups.find((group) => group._id === id);
  const total = transactions.reduce((acc, current) => {
    return acc + current.amount;
  }, 0);
  return (
    <div className="bg-[#deacsf] p-4 rounded-lg shadow-md mb-4 text-[#28014E]">
      <h2 className=" mb-2 font-semibold tracking-wider text-lg">
        Total spent
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-[#9b3675] to-[#81346b] text-white rounded-full h-10 w-10 flex items-center justify-center">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="ml-4">
            <h3 className="tracking-wide">Total money spent for {name}</h3>
          </div>
        </div>
        <p className="font-bold">₹{total}</p>
      </div>
    </div>
  );
}
