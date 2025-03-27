import { useEffect, useState } from "react";

function CustomDropdown({ options, value, changeHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(function () {
    changeHandler(options[0]);
  }, []);
  return (
    <div className="relative  inline-block  w-full">
      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" text-black border-none  shadow-lg px-4 py-3 cursor-pointer flex justify-between items-center text-center bg-purple-100"
      >
        <span>{value}</span>
        <i className="fas fa-caret-down"></i>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute w-70 bg-purple-100 border border-gray-300 rounded-lg shadow-lg mt-1 z-10 w-full">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:b
              g-purple-100 rounded-md transition-all duration-200 bg-purple-50 "
              onClick={() => {
                changeHandler(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
