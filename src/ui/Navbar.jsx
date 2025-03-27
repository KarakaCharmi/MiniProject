import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contextapi/UserAuth";

const Title = () => {
  const [pageno, setPageNo] = useState(0);
  const { loggedIn } = useAuth();

  const getLinkStyle = ({ isActive }) =>
    `text-l font-semibold px-4 py-2 rounded-xl w-30 transition-all duration-300 transform ${
      isActive
        ? "bg-cyan-700 text-stone-100 translate-x-2"
        : "border border-black hover:bg-cyan-700 hover:text-stone-100 hover:translate-x-2 hover:outline-none hover:border-cyan-700"
    }`;

  return (
    <div className="bg-gray-300/40 text-stone-950 flex flex-row items-center justify-between px-4 py-3 rounded-b-full">
      <h1 className="ml-10 text-3xl font-serif">Slice It</h1>
      <div className="flex flex-row items-center gap-4 mr-5">
        <NavLink to="/" end className={getLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" className={getLinkStyle}>
          About Us
        </NavLink>
        <NavLink
          to={loggedIn ? "/explore/creategroup" : "/login"}
          className={getLinkStyle}
        >
          Explore
        </NavLink>
      </div>
    </div>
  );
};

export default Title;
