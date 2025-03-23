import { format } from "date-fns";
const getRandomLightColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 72%, 76%)`;
};
export default function Transaction({ item }) {
  //Destructing the item
  const { category, amount, paidBy, date, splitBetween } = item;
  const formattedDateTime = format(date, "MMMM dd, yyyy h:mm a");
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-cyan-400 text-white rounded-full h-10 w-10 flex items-center justify-center">
          {paidBy[0].toUpperCase()}
        </div>
        <div className="ml-4">
          <h3 className="font-bold text-cyan-900">{category}</h3>
          <p className="text-gray-500 text-sm">{formattedDateTime}</p>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold">{paidBy}</span> paid for
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-cyan-900 font-bold">{amount}</p>
        <div className="flex items-center justify-end mt-2 ">
          {/* <div className="bg-cyan-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-xs relative">
            D
          </div>
          <div className="bg-cyan-400 text-white rounded-full h-8 w-8 flex items-center justify-center text-xs ml-[-8px] relative">
            I
          </div> */}
          {splitBetween.map((friend, index) => (
            <div
              style={{ backgroundColor: getRandomLightColor() }}
              className=" text-white rounded-full h-8 w-8 flex items-center justify-center text-sm relative ml-[-8px] font-semibold"
              key={index}
            >
              {friend[0].toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
