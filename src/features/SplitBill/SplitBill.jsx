import { HiArrowDown, HiChevronDown, HiChevronUpDown } from "react-icons/hi2";
import { useBillContext } from "../../contextapi/BillContextApi";
import SplitEqually from "./SplitEqually";
import SplitManually from "./SplitManually";

export default function SplitBill({ split, setSplit }) {
  const { members } = useBillContext();

  return (
    <div className="p-4 flex flex-col divide-y-[2px] divide-purple-200 ">
      {/* Split Equally */}
      <div className="p-4 shadow-md">
        {/* Select */}
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => {
            if (split === "equal") setSplit("");
            else setSplit("equal");
          }}
        >
          <div className="tracking-widest relative">
            Split amounts equally
            <div
              className={`absolute w-[50%] left-[50%] -translate-x-[50%] h-[1px] -bottom-1 bg-[#9754cb] transition-all duration-700 ${
                split === "equal" ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>
          <HiChevronDown
            className={`transition-transform duration-300 ${
              split === "equal" ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Content with transition */}
        <div
          className={`pt-2 grid transition-all duration-300 ease-in-out ${
            split === "equal"
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className={`overflow-hidden ${split === "equal" ? "mt-2" : ""}`}>
            {members.map((member, index) => (
              <SplitEqually member={member} key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Split Manually */}
      <div className="p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => {
            if (split === "unequal") setSplit("");
            else setSplit("unequal");
          }}
        >
          <div className="tracking-widest relative">
            Split amounts manually
            <div
              className={`absolute w-[50%] left-[50%] -translate-x-[50%] h-[1px] -bottom-1 bg-[#9754cb] transition-all duration-700 ${
                split === "unequal" ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>
          <HiChevronDown
            className={`transition-transform duration-300 ${
              split === "unequal" ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Content with transition */}
        <div
          className={`pt-2 grid transition-all duration-300 ease-in-out ${
            split === "unequal"
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {members.map((member, index) => (
              <SplitManually member={member} key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* <div className="bg-white p-4 rounded shadow mb-4">
      {split === "byAmounts" &&
        members.map((member, index) => (
          <SplitManually member={member} key={index} index={index} />
        ))}
      {split === "equally" &&
        members.map((member, index) => (
          <SplitEqually member={member} key={index} />
        ))}
    </div> */
