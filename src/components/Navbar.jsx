import { NavLink } from "react-router-dom";
import { useState } from "react";

const Title = () => {
  const [pageno, setPageNo] = useState(0);
  const getLinkStyle = (key) => {
    return `text-l font-semibold px-4 py-2 rounded-xl w-30 transition-all duration-300 transform ${
      pageno === key
        ? "bg-cyan-700 text-stone-100 translate-x-2"
        : "border border-black hover:bg-cyan-700 hover:text-stone-100 hover:translate-x-2 hover:outline-none hover:border-cyan-700"
    }`;
  };

  return (
    <div className="bg-gray-300/40 text-stone-950 flex flex-row items-center justify-between px-4 py-3 rounded-b-full ">
      <h1 className=" ml-10 text-3xl font-serif">Slice It</h1>
      <div className="flex flex-row items-center gap-4 mr-5">
        <NavLink
          to="/"
          key={0}
          className={getLinkStyle(0)}
          onClick={(pageno) => {
            setPageNo(0);
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="aboutus"
          key={1}
          className={getLinkStyle(1)}
          onClick={(pageno) => setPageNo(1)}
        >
          About Us
        </NavLink>
        <NavLink
          to="explore"
          key={2}
          className={getLinkStyle(2)}
          onClick={(pageno) => setPageNo(2)}
        >
          Explore
        </NavLink>
      </div>
    </div>
  );
};

export default Title;
