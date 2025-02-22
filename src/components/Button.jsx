const Button = ({ children }) => {
  return (
    <button className="text-l font-semibold border border-black px-10 py-2 rounded-xl w-30 hover:bg-cyan-700 hover:text-stone-100 hover:outline-none hover:border-cyan-700 transistion all duration-300">
      {children}
    </button>
  );
};

export default Button;
