import { useParams } from "react-router-dom";
import { useAuth } from "../../contextapi/UserAuth";
import Recent from "./Recent";

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
  return (
    <div className="bg-cyan-50 p-4 rounded-lg shadow-md">
      <h2 className="text-gray-600 mb-2">Recent activity</h2>
      {recents.map((recent) => (
        <Recent recent={recent} key={recent.date} />
      ))}
    </div>
  );
}
