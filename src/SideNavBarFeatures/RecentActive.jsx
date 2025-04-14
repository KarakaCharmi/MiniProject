import { useParams } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";
import Recent from "./Recents";

export default function RecentActivity() {
  const { groups } = useAuth();
  const { id } = useParams();

  if (groups.length === 0) return <div>Debts Loadings....</div>;
  //finding Group with id

  const { transactions } = groups.find((group) => group._id === id);
  const transLength = transactions.length;
  if (!transactions) return;
  let recents;
  if (transLength < 4) {
    recents = transactions.slice(-transLength);
  } else {
    recents = transactions.slice(-3);
  }
  recents.reverse();
  return (
    <div className="bg-[#deacsf] p-4 rounded-lg shadow-md">
      <h2 className="text-[#28104E] font-semibold capitalize tracking-wider mb-4">
        Recent activity
      </h2>
      
      <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-700">
                  <th className="py-2">Paid By</th>
                  <th className="py-2">Paid For</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
      {recents.map((recent) => (
        <Recent recent={recent} key={recent.date} />
      ))}
      </tbody>
      </table>
    </div>
  );
}
