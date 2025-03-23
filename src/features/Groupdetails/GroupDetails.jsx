import Debts from "./Debts";
import RecentActivity from "./RecentActivity";
import TotalSpent from "./TotalSpent";
import Transactions from "./Transactions";
import Modal from "../../ui/Modal";
import PayBill from "../PayBill/PayBill";
import { useBillContext } from "../PayBill/BillContextApi";
import { useEffect } from "react";
import { useAuth } from "../../contextapi/UserAuth";
import { useParams } from "react-router-dom";

export default function GroupDetails() {
  const { id } = useParams();
  const { groups } = useAuth();
  const { setMembers } = useBillContext();

  // Ensure groups is defined before accessing find()
  if (!groups) {
    return <p className="text-center text-gray-600">Loading groups...</p>;
  }

  // Find the group and ensure it doesn't return undefined
  const group = groups.find((item) => item._id === id) || {};
  const {
    name = "Unknown Group",
    description = "No description available",
    transactions,
    members = [],
  } = group;

  useEffect(() => {
    if (members.length > 0) {
      setMembers(members);
    }
  }, [members, setMembers]);

  return (
    <div className="max-w-5xl m-auto my-5">
      <div className="bg-cyan-900 text-white p-4 flex items-center justify-between">
        <div className="flex my-5 flex-col ml-4 gap-1">
          <h1 className="text-xl font-bold">Group name: {name} </h1>
          <div className="indent-8">&mdash; {description}</div>
        </div>
      </div>
      {transactions.length === 0 ? (
        <div className="p-4 bg-slate-100">No transactions yet...!</div>
      ) : (
        <div className="p-4 bg-slate-100">
          <Transactions transactions={transactions} />
          <Debts transactions={transactions} />
          <TotalSpent transactions={transactions} />
          <RecentActivity />
        </div>
      )}
      <Modal>
        <Modal.Open opens="payBill">
          <button className="sticky left-3/4 bottom-10 bg-cyan-800 text-white px-4 py-2 rounded-full shadow-lg font-bold text-2xl">
            +
          </button>
        </Modal.Open>
        <Modal.Window name="payBill">
          <PayBill />
        </Modal.Window>
      </Modal>
    </div>
  );
}
