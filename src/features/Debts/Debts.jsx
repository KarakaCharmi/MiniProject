import { useAuth } from "../../contextapi/UserAuth";
import { useParams } from "react-router-dom";
import EachDebt from "./EachDebt";
import { getDebts } from "../../utils/getDebts";
import { useState } from "react";
import { HiChevronDown, HiChevronUp, HiScale } from "react-icons/hi2";

export default function Debts() {
  const { groups } = useAuth();
  const { id } = useParams();
  const [openMemberDebt, setOpenMemberDebt] = useState("");

  function handleClick(from) {
    if (openMemberDebt === from) setOpenMemberDebt("");
    else setOpenMemberDebt(from);
  }

  if (groups.length === 0) return <div>Debts Loading...</div>;

  const { members, transactions } = groups.find((group) => group._id === id);
  const debts = getDebts({ members, transactions });
  console.log(debts);
  return (
    <div className="bg-[#f5f3ff] p-4 rounded-lg mb-4">
      {" "}
      {/* Fixed bg color */}
      <h2 className="text-[#28104E] mb-4 font-semibold tracking-widest flex items-center gap-4 text-2xl">
        <HiScale />
        Debts
      </h2>
      <div className="divide-y-[0.75px] flex flex-col divide-[#e9e5ff]">
        {members.map((from, i1) => {
          if (members.reduce((sum, to) => sum + debts[from][to], 0) !== 0)
            return (
              <div
                key={i1}
                className="shadow-md text-[#28104E] tracking-wide transition-all duration-300"
              >
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => handleClick(from)}
                >
                  <div className="mx-4 my-4 text-[#28104E] tracking-wide relative">
                    <span className="capitalize text-lg tracking-wide font-medium ">
                      {from}&apos;s Debts
                    </span>
                    <div
                      className={`absolute w-[50%] left-[50%] -translate-x-[50%] h-[1px] -bottom-1 bg-[#9754cb] transition-all duration-700 ${
                        openMemberDebt === from ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                  <button className="text-cyan-950 font-bold pr-6 text-lg transition-transform duration-700">
                    {openMemberDebt === from ? (
                      <HiChevronUp />
                    ) : (
                      <HiChevronDown />
                    )}
                  </button>
                </div>
                <div
                  className={`transition-all duration-1000 overflow-hidden ${
                    openMemberDebt === from
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {openMemberDebt === from && (
                    <div className="flex flex-col">
                      {members.map((to, i2) => {
                        if (debts[from][to] === 0) return null;
                        return (
                          <EachDebt
                            from={from}
                            to={to}
                            key={`${i1}-${i2}`}
                            amount={debts[from][to]}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}
