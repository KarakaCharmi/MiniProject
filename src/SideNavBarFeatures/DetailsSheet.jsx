import { motion } from "framer-motion";
import {
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Wifi,
  CreditCard,
  Briefcase,
  Zap,
  Droplet,
  Plane,
  Heart,
  Smartphone,
  GraduationCap,
  Gift,
  Coffee,
  DollarSign,
} from "lucide-react";

const DetailsSheet = ({ transactions, COLORS }) => {
  const totalMoney = transactions.reduce((sum, item) => sum + item.value, 0);

  // Function to get icon based on category name
  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();

    if (name.includes("shopping") || name.includes("retail"))
      return <ShoppingCart size={18} />;
    if (
      name.includes("rent") ||
      name.includes("mortgage") ||
      name.includes("house")
    )
      return <Home size={18} />;
    if (
      name.includes("car") ||
      name.includes("auto") ||
      name.includes("vehicle")
    )
      return <Car size={18} />;
    if (
      name.includes("food") ||
      name.includes("restaurant") ||
      name.includes("dining")
    )
      return <Utensils size={18} />;
    if (
      name.includes("internet") ||
      name.includes("wifi") ||
      name.includes("network")
    )
      return <Wifi size={18} />;
    if (
      name.includes("credit") ||
      name.includes("card") ||
      name.includes("payment")
    )
      return <CreditCard size={18} />;
    if (
      name.includes("work") ||
      name.includes("salary") ||
      name.includes("income")
    )
      return <Briefcase size={18} />;
    if (
      name.includes("utility") ||
      name.includes("electric") ||
      name.includes("power")
    )
      return <Zap size={18} />;
    if (name.includes("water") || name.includes("gas"))
      return <Droplet size={18} />;
    if (
      name.includes("travel") ||
      name.includes("flight") ||
      name.includes("vacation")
    )
      return <Plane size={18} />;
    if (
      name.includes("health") ||
      name.includes("medical") ||
      name.includes("fitness")
    )
      return <Heart size={18} />;
    if (
      name.includes("phone") ||
      name.includes("mobile") ||
      name.includes("tech")
    )
      return <Smartphone size={18} />;
    if (
      name.includes("education") ||
      name.includes("school") ||
      name.includes("tuition")
    )
      return <GraduationCap size={18} />;
    if (name.includes("gift") || name.includes("present"))
      return <Gift size={18} />;
    if (name.includes("coffee") || name.includes("cafe"))
      return <Coffee size={18} />;

    // Default icon
    return <DollarSign size={18} />;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Transaction Details
      </h2>
      <ul className="space-y-4">
        {transactions.map((transaction, index) => {
          const percentage = (transaction.value / totalMoney) * 100;
          const color = COLORS[index % COLORS.length];

          return (
            <li
              key={index}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${color}25` }}
                  >
                    <div style={{ color }}>
                      {getCategoryIcon(transaction.name)}
                    </div>
                  </div>
                  <h3 className="text-base font-medium text-gray-700 dark:text-gray-200">
                    {transaction.name}
                  </h3>
                </div>
                <div className="flex items-center">
                  <div className="text-sm font-mono">
                    <span className="font-bold" style={{ color }}>
                      ${transaction.value.toFixed(2)}
                    </span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ${totalMoney.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total
          </span>
          <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
            ${totalMoney.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailsSheet;
