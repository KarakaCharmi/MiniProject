import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useAuth } from "../contextapi/UserAuth";
import { useParams } from "react-router-dom";
import DetailsSheet from "./DetailsSheet";
import IndividualCharts from "./IndividualCharts";

export default function Statistics() {
  const { groups } = useAuth();
  const { id } = useParams();
  const group = groups.find((item) => item._id === id) || {};
  const { transactions = [], members } = group;

  console.log("🚀 Transactions:", transactions);

  const [activeTab, setActiveTab] = useState("category");

  const { categoryData, individualData } = useMemo(() => {
    if (transactions.length === 0)
      return { categoryData: [], individualData: [] };

    const categoryTotals = transactions.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

    const individualCategoryTotals = transactions.reduce((acc, item) => {
      if (!acc[item.paidBy]) acc[item.paidBy] = {};
      acc[item.paidBy][item.category] =
        (acc[item.paidBy][item.category] || 0) + item.amount;
      return acc;
    }, {});

    const allIndividuals = members.reduce((acc, member) => {
      acc[member] = individualCategoryTotals[member] || {};
      return acc;
    }, {});

    return {
      categoryData: Object.keys(categoryTotals).map((category) => ({
        name: category,
        value: categoryTotals[category],
      })),
      individualData: Object.keys(allIndividuals).map((person) => ({
        name: person,
        ...allIndividuals[person],
      })),
    };
  }, [transactions]);

  console.log("Category Data:", categoryData);
  console.log("Individual Data:", individualData);

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

  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-gray-400 text-lg">
        Loading transactions...
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center gap-6 py-4 bg-[#16181D] rounded-t-lg ">
        {["category", "individuals"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md font-semibold transition-all ${
              activeTab === tab
                ? "bg-gray-500 text-white"
                : "bg-[#1E2026] text-gray-300 border border-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-start w-full min-h-screen bg-[#0F1115] shadow-2xl  border-[#2E3A50] border-t-2 ">
        <div className="flex w-full max-w-7xl gap-8 p-3">
          {activeTab === "category" ? (
            <div className="flex w-full gap-8">
              <div className="flex-1 flex flex-col items-center bg-[#1E2026] p-3 min-h-[300px] rounded-xl py-4 ">
                <h2 className="text-2xl font-bold text-gray-300 mb-2">
                  Expense Breakdown
                </h2>
                {categoryData.length > 0 ? (
                  <PieChart className="mt-4" width={600} height={300}>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        color: "#1A1A1D",
                        borderRadius: "10px",
                        border: "1px solid gray",
                      }}
                    />
                    <Legend />
                  </PieChart>
                ) : (
                  <p className="text-gray-400">No transaction data available</p>
                )}
              </div>
              <div className="flex-1 flex flex-col bg-[#0F1115] p-2  rounded-xl ">
                <DetailsSheet transactions={categoryData} COLORS={COLORS} />
              </div>
            </div>
          ) : (
            <div className="flex w-full mx-auto  justify-center">
              <IndividualCharts individualData={individualData} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
