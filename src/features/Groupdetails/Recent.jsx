import { format } from "date-fns";

export default function Recent({ recent }) {
  const { category, amount, paidBy, date } = recent;
  const formattedDateTime = format(date, "MMMM dd, yyyy h:mm a");
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="bg-cyan-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
          {paidBy[0].toUpperCase()}
        </div>
        <div className="ml-4">
          <p className="font-bold">
            {paidBy} paid for: {category} (₹ {amount})
          </p>
          <p className="text-gray-500 text-sm">{formattedDateTime}</p>
        </div>
      </div>
    </>
  );
}
