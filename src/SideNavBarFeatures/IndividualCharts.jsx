import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "next-themes";
import { Trophy, LayoutGrid, TrendingUp } from "lucide-react";

export default function IndividualCharts({ individualData = [] }) {
  console.log("🚀 Received Individual Data:", individualData);
  
  // Get theme from next-themes (if using) or fallback to a check for dark mode preference
  const { resolvedTheme } = useTheme?.() || {};
  const isDarkMode = resolvedTheme === "dark" || window?.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

  if (!individualData || individualData.length === 0) {
    return (
      <div className="mt- rounded-lg flex flex-col items-center justify-center w-full h-96 bg-slate-50 dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Individual Expense Breakdown</h2>
        <p className="text-slate-500 dark:text-slate-400">No individual expense data available</p>
      </div>
    );
  }

  // Extract all unique categories
  const categories = Array.from(
    new Set(individualData.flatMap((person) => Object.keys(person).filter((key) => key !== "name")))
  );

  // Improved color palette - more vibrant and harmonious
  const COLORS = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
    "#6366F1", // Indigo
    "#EC4899", // Pink
    "#06B6D4", // Cyan
    "#8B5CF6", // Violet
    "#F97316", // Orange
    "#14B8A6", // Teal
    "#EF4444"  // Red
  ];

  // Axis styling colors - more pronounced/highlighted
  const axisLegendColor = isDarkMode ? '#f8fafc' : '#0f172a'; // Very light/dark for contrast
  const axisTickColor = isDarkMode ? '#94a3b8' : '#334155'; // Medium contrast
  const axisLineColor = isDarkMode ? '#cbd5e1' : '#475569'; // Good visibility
  const gridLineColor = isDarkMode ? '#475569' : '#cbd5e1'; // Visible but not distracting

  return (
    <div className="flex gap-10">
     <div className="mt-2 rounded-lg  gap-1 items-center justify-center  bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-4">
      <div className="flex flex-col w-full mb-3">
        <h2 className="text-3xl font-bold text-gray-100 mb-4 text-center">Individual Expense Analysis</h2>
       
      </div>
      <div style={{ height: 400, width: "80%", maxWidth: "600px", overflowX: "auto" }}>
      <ResponsiveBar
          data={individualData}
          keys={categories}
          indexBy="name"
          margin={{ top: 40, right: 40, bottom: 60, left: 80 }}
          padding={0.15} // Decreased from 0.3 to make bars tighter
          indexScale={{ type: "band", round: true, padding: 0.2 }} // Reduce spacing between names
          valueScale={{ type: "linear" }}
          colors={({ id }) => COLORS[categories.indexOf(id) % COLORS.length]}
          borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
          borderWidth={1}
          borderRadius={4}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -25, // Slight tilt for better fit
            textColor: axisTickColor,
            fontSize: 14, // Reduced font size
            legend: null, // Removed the "Individuals" legend
            legendColor: axisLegendColor,
            tickColor: axisLineColor,
            renderTick: (tick) => {
              return (
                <g transform={`translate(${tick.x},${tick.y})`}>
                  <line stroke={axisLineColor} strokeWidth={2} y2={8} />
                  <text
                    textAnchor="end"
                    dominantBaseline="middle"
                    transform="translate(10,22)rotate(-20)"
                    style={{ 
                      fill: axisTickColor,
                      fontWeight: '600',
                      fontSize: '20px'
                    }}
                  >
                    {tick.value}
                  </text>
                </g>
              );
            }
          }}
          axisLeft={{
            tickSize: 8,
            tickPadding: 8,
            tickWidth: 2,
            legendPosition: 'middle',
            legendOffset: -60,
            legend: 'Amount Spent',
            legendColor: axisLegendColor,
            tickColor: axisLineColor,
            textColor: axisTickColor,
            format: value => 
              value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${value}`,
            renderTick: (tick) => {
              return (
                <g transform={`translate(${tick.x},${tick.y})`}>
                  <line stroke={axisLineColor} strokeWidth={2} x2={-8} />
                  <text
                    textAnchor="end"
                    dominantBaseline="middle"
                    transform="translate(-12,0)"
                    style={{ 
                      fill: axisTickColor,
                      fontWeight: '600',
                      fontSize: '12px'
                    }}
                  >
                    {tick.format ? tick.format(tick.value) : tick.value}
                  </text>
                </g>
              );
            }
          }}
          enableLabel={true}
          labelSkipWidth={16}
          labelSkipHeight={16}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 2.5]]
          }}
          enableGridY={true}
          gridYValues={5}
          theme={{
            axis: {
              legend: {
                text: {
                  fontSize: 14,
                  fontWeight: 700,
                  fill: axisLegendColor
                }
              },
              ticks: {
                line: {
                  strokeWidth: 2
                },
                text: {
                  fontSize: 12,
                  fontWeight: 600
                }
              }
            },
            tooltip: {
              container: {
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                color: isDarkMode ? '#e2e8f0' : '#334155',
                fontSize: 12,
                fontWeight: 500,
                borderRadius: 6,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
              }
            },
            grid: {
              line: {
                stroke: gridLineColor,
                strokeWidth: 1.5,
                strokeDasharray: '4 4'
              }
            }
          }}
          // Removed the legends configuration entirely
          animate={true}
          motionConfig="gentle"
          role="application"
          ariaLabel="Individual expense breakdown chart"
          barAriaLabel={e => `${e.id}: ${e.formattedValue} for ${e.indexValue}`}
          />
      </div>
       <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, index) => (
          <div key={category} className="flex items-center gap-3 px-5 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">{category}</span>
          </div>
        ))}
      </div>
          </div> 
      
      {/* Add a nice statistics strip below the chart */}
      
<div className='mt-6 rounded-lg w-full bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-6'>
  {individualData.length > 0 && (
    <div className="flex flex-col gap-6">
      
      {/* Highest Spender */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-lg px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <Trophy className="text-blue-600 dark:text-blue-300" size={24} />
          </div>
          <h3 className="text-md font-semibold text-slate-600 dark:text-slate-300">
            Highest Spender
          </h3>
        </div>
        <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {individualData.sort((a, b) => {
            const aSum = Object.entries(a).reduce((sum, [key, val]) => key !== 'name' ? sum + val : sum, 0);
            const bSum = Object.entries(b).reduce((sum, [key, val]) => key !== 'name' ? sum + val : sum, 0);
            return bSum - aSum;
          })[0]?.name.toUpperCase() || 'N/A'}
        </div>
      </div>

      {/* Total Categories */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-lg px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
            <LayoutGrid className="text-green-600 dark:text-green-300" size={24} />
          </div>
          <h3 className="text-md font-semibold text-slate-600 dark:text-slate-300">
            Total Categories
          </h3>
        </div>
        <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {categories.length}
        </div>
      </div>

      {/* Top Category */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-lg px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
            <TrendingUp className="text-purple-600 dark:text-purple-300" size={24} />
          </div>
          <h3 className="text-md font-semibold text-slate-600 dark:text-slate-300">
            Top Category
          </h3>
        </div>
        <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {(() => {
            const categoryTotals = categories.map(cat => ({
              category: cat,
              sum: individualData.reduce((sum, person) => sum + (person[cat] || 0), 0)
            }));
            return categoryTotals.sort((a, b) => b.sum - a.sum)[0]?.category || 'N/A';
          })()}
        </div>
      </div>
      
    </div>
  )}
</div>

    </div>
  );
}