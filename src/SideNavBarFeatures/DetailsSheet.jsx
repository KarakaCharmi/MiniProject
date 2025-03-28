import { motion } from "framer-motion";
const DetailsSheet = ({ transactions }) => {
  const totalMoney = transactions.reduce((sum, item) => sum + item.value, 0);
  console.log(totalMoney);
  const colors = [];
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-serif font-semibold  text-gray-700 mb-4">
        Transaction Details
      </h2>
      <ul className="space-y-4">
        {transactions.map((transaction, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded-lg shadow-sm">
            <div className="flex  justify-between items-center ">
              <h3 className="font-mono text-gray-800">
                {transaction.name.toUpperCase()}
              </h3>
              <p className="text-sm text-gray-600">
                <i className="text-teal-400 font-extrabold text-bold ">
                  ${transaction.value.toFixed(2)}
                </i>
                /
                <i className="text-black text-bold font-extrabold text-md">
                  ${totalMoney}
                </i>
              </p>
            </div>

            <div className="mt-2 w-full bg-gray-300 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-pink-600 to-cyan-600 h-2 rounded-full"
                initial={{ width: "0%" }} // Start from 0%
                animate={{
                  width: `${(transaction.value / totalMoney) * 100}%`,
                }} // Expand smoothly
                transition={{ duration: 1.5, ease: "easeOut" }} // Smooth motion
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsSheet;
