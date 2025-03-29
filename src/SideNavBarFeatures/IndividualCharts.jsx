import { motion } from "framer-motion";

const COLORS = [
  "#3498db",
  "#2ecc71",
  "#f39c12",
  "#9b59b6",
  "#e74c3c",
  "#1abc9c",
  "#d35400",
  "#8e44ad",
  "#c0392b",
  "#16a085",
];

const FloatingClouds = ({ data }) => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {data.map((item, index) => {
        const size = Math.max(item.value / 3); // Adjust size dynamically
        return (
          <motion.div
            key={index}
            className="absolute flex items-center justify-center text-white font-semibold rounded-full shadow-lg backdrop-blur-md bg-opacity-40 border border-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: `${COLORS[index % COLORS.length]}50`, // Transparent color bubbles
              top: `${10 + ((index * 15) % 70)}%`, // Keep bubbles within bounds
              left: `${10 + ((index * 20) % 70)}%`, // Keep bubbles within bounds
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5 + index * 0.5,
              ease: "easeInOut",
            }}
          >
            {item.name}
          </motion.div>
        );
      })}
    </div>
  );
};

const IndividualCharts = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="relative w-full max-w-xl bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 text-center overflow-hidden">
        <h3 className="text-2xl font-semibold text-gray-300 mb-4">
          Individual Contributions
        </h3>
        <p className="text-gray-400">No individual data available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-3xl bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 overflow-hidden flex items-center justify-center">
      <h3 className="absolute top-6 text-2xl font-semibold text-white text-center w-full">
        Individual Contributions
      </h3>
      <FloatingClouds data={data} />
    </div>
  );
};

export default IndividualCharts;
