const Form = ({ status }) => {
  console.log(status);
  return (
    <form className="w-full text-bolder">
      {status === false && (
        <div className="relative my-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full text-bolder p-3 bg-gray-200 rounded-lg border-none focus:outline-none text-base font-medium text-gray-800"
          />
        </div>
      )}
      <div className="relative my-5">
        <input
          type="text"
          placeholder="Email"
          className="w-full p-3 text-bolder bg-gray-200 rounded-lg border-none focus:outline-none text-base font-medium text-gray-800"
        />
      </div>
      <div className="relative my-5">
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 text-bolder bg-gray-200 rounded-lg border-none focus:outline-none text-base font-medium text-gray-800"
        />
      </div>
      <div className="my-3">
        <a href="#" className="text-md text-gray-800">
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default Form;
