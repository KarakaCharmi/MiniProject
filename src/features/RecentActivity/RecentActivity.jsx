import { useParams } from "react-router-dom";
import { useAuth } from "../../contextapi/UserAuth";
import Recent from "./Recent";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";

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
      <h2 className="text-[#28104E] font-semibold capitalize tracking-widest mb-4 text-xl flex gap-4">
        <HiOutlineArrowTrendingUp />
        Recent activity
      </h2>
      {recents.map((recent) => (
        <Recent recent={recent} key={recent.date} />
      ))}
    </div>
  );
}
