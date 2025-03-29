import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useAuth } from "../contextapi/UserAuth";
import { useParams } from "react-router-dom";
import DetailsSheet from "./DetailsSheet";
import ExpenseCircles from "./ExpenseCircles";

export default function Statistics() {
  const { groups } = useAuth();
  const { id } = useParams();
  const group = groups.find((item) => item._id === id) || {};
  const { transactions = [], members } = group;

  console.log("🚀 Transactions:", transactions);

  // Memoized expense calculations
  const { categoryData, individualData } = useMemo(() => {
    if (transactions.length === 0)
      return { categoryData: [], individualData: [] };

    // Category-wise total expenses
    const categoryTotals = transactions.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

    // Individual-wise total expenses
    const individualTotals = transactions.reduce((acc, item) => {
      acc[item.paidBy] = (acc[item.paidBy] || 0) + item.amount;
      return acc;
    }, {});
    const allIndividuals = members.reduce((acc, member) => {
      acc[member] = individualTotals[member] || 0;
      return acc;
    }, {});
    return {
      categoryData: Object.keys(categoryTotals).map((category) => ({
        name: category,
        value: categoryTotals[category],
      })),
      individualData: Object.keys(allIndividuals).map((person) => ({
        name: person,
        value: individualTotals[person] ?? 0,
      })),
    };
  }, [transactions]);

  console.log("Category Data:", categoryData);
  console.log("Individual Data:", individualData);

  // Updated neon color palette
  const COLORS = [
    "#FF6B6B",
    "#FFD93D",
    "#4ECDC4",
    "#FF9F1C",
    "#5A189A",
    "#6A0572",
    "#00E676",
    "#14A098",
    "#B5179E",
    "#4361EE",
  ];

  // Show a loading state until transactions are available
  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-gray-400 text-lg">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-md flex flex-col items-center justify-center w-full h-full bg-[#1A1A1D] shadow-md border border-gray-600">
      {/* Pie Chart & Details Section */}
      <div className="flex w-full max-w-7xl gap-8 p-1 rounded-2xl">
        {/* Pie Chart: Expense Breakdown */}
        <div className="flex-1 flex flex-col items-center bg-[#2D2D30] shadow-lg rounded-2xl p-6 min-h-[500px] border border-gray-500">
          <h2 className="text-2xl font-bold text-gray-300 mb-4">
            Expense Breakdown
          </h2>
          {categoryData.length > 0 ? (
            <PieChart width={600} height={400}>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  color: "#1A1A1D",
                  borderRadius: "10px",
                  border: "1px solid #5DB996",
                  boxShadow: "0px 0px 15px rgba(93, 185, 150, 0.6)",
                }}
              />
              <Legend />
            </PieChart>
          ) : (
            <p className="text-gray-400">No transaction data available</p>
          )}
        </div>

        {/* Details Sheet */}
        <div className="flex-1 flex flex-col bg-[#2D2D30] shadow-lg rounded-2xl p-6 min-h-[500px] overflow-y-auto border border-gray-500">
          <DetailsSheet transactions={categoryData} />
        </div>
      </div>

      {/* Individual Contributions Chart */}
    </div>
  );
}
