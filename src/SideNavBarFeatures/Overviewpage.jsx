import RecentActivity from "./RecentActive";
import { useEffect } from "react";
import { useBillContext } from "../contextapi/BillContextApi";
import { useParams } from "react-router-dom";
import { getDebts } from "../utils/getDebts";
import { useAuth } from "../contextapi/UserAuth";
import { Users, Wallet } from "lucide-react";

export default function Overviewpage() {
  const { id } = useParams();
  const { groups } = useAuth();
  const { setMembers } = useBillContext();

  if (!groups) {
    return <p className="text-center text-gray-600">Loading groups...</p>;
  }

  const {
    name = "Unknown Group",
    transactions = [],
    members = [],
    description,
  } = groups.find((group) => group._id === id) || {};

  const total = transactions.reduce((acc, current) => acc + current.amount, 0);

  useEffect(() => {
    if (members.length > 0) {
      setMembers(members);
    }
  }, [members, setMembers]);

  const debts = getDebts({ members, transactions });

  const totalPaid = {};
  const balance = {};

  members.forEach((member) => {
    totalPaid[member] = 0;
    balance[member] = 0;
  });

  transactions.forEach((transaction) => {
    totalPaid[transaction.paidBy] += transaction.amount;
  });

  members.forEach((from) => {
    members.forEach((to) => {
      balance[from] += debts[to][from];
      balance[from] -= debts[from][to];
    });
  });

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="grid grid-cols-[70%_30%] gap-6 h-screen">
        {/* Left Column */}
        <div className="flex flex-col gap-6 w-full ml-4">
          {/* Group Info + Total Spent */}
          <div className="bg-gray-850 p-6 rounded-2xl shadow-md border border-gray-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg transition duration-300">
            {/* Group Info */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 text-white rounded-full p-3">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-blue-400">{name}</h1>
                <p className="text-gray-400 text-sm md:text-base mt-1">{description}</p>
              </div>
            </div>

            {/* Total Spent */}
            <div className="flex items-center gap-4">
              <div className="bg-green-500 text-white rounded-full p-3">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Spent</p>
                <p className="text-3xl font-bold text-green-400">₹{total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md flex-grow">
            <h2 className="text-lg font-semibold text-gray-400 mb-4">Recent Expenses</h2>
            <RecentActivity />
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-start mr-4 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-400">User Spend Overview</h2>
          {members.map((user, index) => (
  <div key={index} className="mt-4">
    {/* User Name */}
    <div className="flex justify-between">
      <p className="text-lg font-medium text-gray-300">{user.toUpperCase()}</p>
      <p className="text-sm font-medium text-gray-300">₹{totalPaid[user].toFixed(2)}</p>
    </div>
    {/* Progress Bar */}
    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
      <div
        className="bg-green-400 h-2 rounded-full transition-all duration-300"
        style={{
          width: `${(totalPaid[user] / total) * 100}%`,
        }}
      ></div>
    </div>
    {/* Balance Display */}
    <p
      className={`text-sm font-semibold mt-1 ${
        balance[user] >= 0 ? "text-green-400" : "text-red-400"
      }`}
    >
      {balance[user] >= 0
        ? `+ ₹${balance[user].toFixed(2)}`
        : `- ₹${Math.abs(balance[user]).toFixed(2)}`}
    </p>
  </div>
))}

        </div>
      </div>
    </div>
  );
}
