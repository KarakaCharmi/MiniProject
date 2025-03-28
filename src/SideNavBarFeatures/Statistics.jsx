import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useAuth } from "../contextapi/UserAuth";
import { useParams } from "react-router-dom";
import DetailsSheet from "./DetailsSheet";

export default function Statistics() {
  const { groups } = useAuth();
  const { id } = useParams();
  const group = groups.find((item) => item._id === id) || {};
  const { transactions = [] } = group;

  console.log("🚀 Transactions:", transactions);

  // Memoize calculations to optimize performance
  const data = useMemo(() => {
    if (transactions.length === 0) return [];

    const categoryTotals = transactions.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

    return Object.keys(categoryTotals).map((category) => ({
      name: category,
      value: categoryTotals[category],
    }));
  }, [transactions]);

  // Updated neon color palette (from side navbar theme)
  const COLORS = [
    "#FF6B6B", // Vibrant Coral Red
    "#FFD93D", // Bright Neon Yellow
    "#4ECDC4", // Electric Cyan
    "#FF9F1C", // Deep Orange-Gold
    "#5A189A", // Rich Purple
    "#6A0572", // Dark Magenta
    "#00E676", // Neon Green
    "#14A098", // Teal Blue
    "#B5179E", // Hot Pink
    "#4361EE", // Electric Blue
  ];

  // Show a loading state until transactions are available
  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-gray-400 text-lg">
        Loading transactions...
      </div>
    );
  }
  const CustomLabel = ({ name, percent }) => {
    return (
      <text
        className="text-sm font-mono fill-white"
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {name.length > 8 ? name.slice(0, 8) + "..." : name}{" "}
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };
  return (
    <div className=" mt-5  rounded-md flex flex-col items-center justify-center w-[100%] h-[100%] bg-[#1A1A1D] shadow-md border border-gray-600 ">
      {/* Container for the Pie Chart and Details */}
      <div className="flex w-full max-w-7xl gap-8 p-1 rounded-2xl">
        {/* Left Side: Pie Chart */}
        <div className="flex-1 flex flex-col items-center bg-[#2D2D30] shadow-lg rounded-2xl p-6 min-h-[500px] border border-gray-500">
          <h2 className="text-2xl font-bold text-gray-300 mb-4">
            Expense Breakdown
          </h2>
          {data.length > 0 ? (
            <PieChart width={600} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60} // Creates the donut effect
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF", // Bright white for clear contrast
                  color: "#1A1A1D", // Dark gray for high readability
                  borderRadius: "10px",
                  border: "1px solid #5DB996", // Aqua Green for a fresh accent
                  boxShadow: "0px 0px 15px rgba(93, 185, 150, 0.6)", // Subtle neon glow
                }}
              />

              <Legend />
            </PieChart>
          ) : (
            <p className="text-gray-400">No transaction data available</p>
          )}
        </div>

        {/* Right Side: Details Sheet */}
        <div className="flex-1 flex flex-col bg-[#2D2D30] shadow-lg rounded-2xl p-6 min-h-[500px] overflow-y-auto border border-gray-500">
          <DetailsSheet transactions={data} />
        </div>
      </div>
    </div>
  );
}
