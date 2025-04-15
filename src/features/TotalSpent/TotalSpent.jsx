import { useParams } from "react-router-dom";
import { useAuth } from "../../contextapi/UserAuth";
import {
  HiArrowTrendingUp,
  HiOutlineArrowTrendingUp,
  HiOutlineBanknotes,
} from "react-icons/hi2";

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
      <h2 className=" mb-4 font-semibold tracking-wider text-2xl flex gap-4">
        <HiOutlineBanknotes />
        Total spent
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-[#282828] opacity-[90%] text-white rounded-full h-10 w-10 flex items-center justify-center">
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
