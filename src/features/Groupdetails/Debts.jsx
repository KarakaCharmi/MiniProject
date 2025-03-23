import { useAuth } from "../../contextapi/UserAuth";
import { useParams } from "react-router-dom";
import EachDebt from "../EachDebt";

export default function Debts() {
  /*  const { groups } = useAuth();
  const { id } = useParams();
  //Finding the group with the id

  const { transactions, members } = groups.filter((group) => group._id === id);
  //Creating a balanceSheet object for all members

  const debts = {};

  members.forEach((member) => {
    debts[member] = 0;
  });

  if (!groups) return <div>Debts Loading....</div>; */

  const { groups } = useAuth();
  const { id } = useParams();

  if (groups.length === 0) return <div>Debts Loadings....</div>;
  //finding Group with id

  const { members, transactions } = groups.find((group) => group._id === id);

  const debts = {};

  members.forEach((member) => {
    debts[member] = {};
  });

  members.forEach((from) => {
    members.forEach((to) => {
      if (from !== to) debts[from][to] = 0;
    });
  });

  transactions.forEach((transaction) => {
    const to = transaction.paidBy;
    transaction.splitBetween.forEach((from) => {
      debts[from][to] += transaction.amount / transaction.splitBetween.length;
    });
  });

  members.forEach((from) => {
    members.forEach((to) => {
      const fromto = debts[from][to];
      const tofrom = debts[to][from];
      if (fromto > tofrom) {
        debts[from][to] = fromto - tofrom;
        debts[to][from] = 0;
      } else {
        debts[to][from] = tofrom - fromto;
        debts[from][to] = 0;
      }
    });
  });

  return (
    <div className="bg-cyan-50 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-gray-600 mb-2">Debts</h2>
      <div className="divide-y-2 flex flex-col divide-cyan-200 shadow-md">
        {members.map((from, i1) => {
          return members.map((to, i2) => {
            if (debts[from][to] === 0) return;
            return (
              <EachDebt
                from={from}
                to={to}
                key={`${i1}-${i2}`} // Use a unique key combining i1 and i2
                amount={debts[from][to]}
              />
            );
          });
        })}
      </div>

      <button className="mt-4 ml-8  bg-cyan-400 font-medium text-white px-4 py-2 rounded-lg w-fit h-9">
        SEND TO FRIENDS
      </button>
    </div>
  );
}
