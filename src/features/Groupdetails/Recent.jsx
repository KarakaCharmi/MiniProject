import { format } from "date-fns";

export default function Recent({ recent }) {
  const { category, amount, paidBy, date } = recent;
  const formattedDateTime = format(date, "MMMM dd, yyyy h:mm a");
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-[#9b3675] to-[#81346b]  text-white rounded-full h-10 w-10 flex items-center justify-center">
          {paidBy[0].toUpperCase()}
        </div>
        <div className="ml-4 text-[#28104E] tracking-wide">
          <p>
            {paidBy} paid for: {category} (₹ {amount})
          </p>
          <p className="text-gray-500 text-sm indent-6">
            &mdash; {formattedDateTime}
          </p>
        </div>
      </div>
    </>
  );
}
