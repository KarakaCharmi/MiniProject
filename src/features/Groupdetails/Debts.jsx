import { HiArrowLongRight } from "react-icons/hi2";

export default function Debts() {
  return (
    <div className="bg-cyan-50 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-gray-600 mb-2">Debts</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-cyan-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
            D
          </div>
          <div className="ml-4">
            <h3 className="font-bold flex">
              dheekshita{" "}
              <span className="px-5 mt-1">
                <HiArrowLongRight />
              </span>{" "}
              lalitha
            </h3>
            <p className="text-gray-500 text-sm">₹350</p>
          </div>
        </div>
        <div className="bg-cyan-600 text-white rounded-full h-10 w-10 flex items-center justify-center">
          I
        </div>
      </div>
      <button className="mt-4 ml-8  bg-cyan-400 font-medium text-white px-4 py-2 rounded-lg w-fit h-9">
        SEND TO FRIENDS
      </button>
    </div>
  );
}
