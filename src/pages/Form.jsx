import { useState } from "react";
import { useAuth } from "../contextapi/UserAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Form = ({ status }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signup, login, logout } = useAuth(); // Get user & logout function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      if (status) {
        // If status is true, it's a login
        await login(email, password);
        toast.success("Login successful!");
      } else {
        // If status is false, it's a signup
        await signup(name, email, password);
        toast.success("Signup successful!");
      }
      navigate("/explore/creategroup"); // Redirect after success
    } catch (error) {
      console.error("Authentication Error:", error.message);
      toast.error(error.message); // Show error message
    }
  };

  return (
    <div className="w-full text-bolder">
      {/* Show user details if logged in */}
      {user ? (
        <div className="my-5 p-4 bg-green-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <button
            onClick={logout}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {!status && (
            <div className="relative my-5">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none text-base font-medium text-gray-800"
                required
              />
            </div>
          )}
          <div className="relative my-5">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none text-base font-medium text-gray-800"
              required
            />
          </div>
          <div className="relative my-5">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none text-base font-medium text-gray-800"
              required
            />
          </div>
          <button
            className="w-full h-12 bg-blue-500 rounded-lg text-white font-semibold shadow-md"
            type="submit"
          >
            {status ? "Sign In" : "Sign Up"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
