import { format } from "date-fns";
import { useBillContext } from "../../contextapi/BillContextApi";
const getRandomDarkCoolColor = () => {
  // Hue ranges for blue (200-260), purple (261-300), magenta (301-360)
  const hue = Math.floor(Math.random() * 161) + 200; // 200-360 range
  const saturation = Math.floor(Math.random() * 30) + 70; // 70-100% saturation
  const lightness = Math.floor(Math.random() * 15) + 20; // 20-35% lightness (dark)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
export default function Transaction({ item }) {
  //Destructing the item
  const { category, amount, paidBy, date, splitBetween } = item;
  const { currency } = useBillContext();
  const formattedDateTime = format(date, "MMMM dd, yyyy h:mm a");

  return (
    <div className="flex items-center justify-between py-4 px-3 shadow-md text-lg tracking-wide">
      <div className="flex items-center">
        <div className="ml-4">
          <h3 className="font-semibold text-[#28014E] tracking-wider capitalize mb-2 text-lg">
            {category}
          </h3>
          <p className="text-gray-500 text-sm tracking-widest">
            {formattedDateTime}
          </p>
          <p className="text-gray-500 text-sm tracking-widest">
            <span className="font-semibold capitalize">
              {/* {paidBy.includes("(") ? paidBy.split("(")[0].trim() : paidBy} */}
              {paidBy}
            </span>{" "}
            paid for
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-cyan-900 font-bold">
          <span>
            {currency === "INR" ? "₹" : currency === "USD" ? "$" : "₵"}
          </span>
          {amount}
        </p>
        <div className="flex items-center justify-end mt-2 ">
          {/* <div className="bg-cyan-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-xs relative">
            D
          </div>
          <div className="bg-cyan-400 text-white rounded-full h-8 w-8 flex items-center justify-center text-xs ml-[-8px] relative">
            I
          </div> */}
          {splitBetween
            .filter((friend) => friend !== paidBy)
            .map((friend, index) => (
              <div
                style={{ backgroundColor: getRandomDarkCoolColor() }}
                className=" text-white rounded-full h-8 w-8 flex items-center justify-center text-sm relative ml-[-8px] font-semibold"
                key={index}
                title={friend}
              >
                {friend[0].toUpperCase()}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
