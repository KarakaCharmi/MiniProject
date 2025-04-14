import { format } from "date-fns";

export default function Recent({ recent }) {
  const { category, amount, paidBy, date } = recent;
  const formattedDateTime = format(date, "MMMM dd, yyyy h:mm a");
  return (
   
                  <tr className="border-b border-gray-700">
                    <td className="py-3 text-gray-300">{paidBy}</td>
                    <td className="py-3 text-gray-400">{category}</td>
                    <td className="py-3 text-gray-400">{amount}</td>
                    <td className="py-3 text-gray-400">
                    &mdash;  {formattedDateTime}
                    </td>
                  </tr>
    
  );
}
