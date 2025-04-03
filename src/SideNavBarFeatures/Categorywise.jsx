import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
export default function Categorywise({categoryData=[]})
{
    return(
    <>
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
    </>
        )}