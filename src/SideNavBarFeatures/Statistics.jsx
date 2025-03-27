import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useBillContext } from "../contextapi/BillContextApi";

export default function Statistics() {
  const { transactions } = useBillContext();
  console.log("🚀 Transactions:", transactions);

  const categoryTotals = transactions.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  console.log("📊 Category Totals:", categoryTotals);

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  console.log("📈 Pie Chart Data:", data);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF4848", "#A569BD"];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
