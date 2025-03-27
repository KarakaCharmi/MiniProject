import { useState } from "react";
import Form from "./Form";

import Navbar from "../ui/Navbar";
import { useAuth } from "../contextapi/UserAuth";
const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const { setLoggedIn, user } = useAuth();
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
        <div className=" pr-20 relative w-[850px] h-[550px] bg-white m-5 rounded-3xl shadow-2xl overflow-hidden transition-all">
          {/* Toggle Panels */}
          <div className="absolute w-full h-full ">
            <div
              className={` absolute left-[-250%] w-[300%] h-full ${
                isActive ? "bg-pink-300/40" : "bg-cyan-300/40"
              } rounded-[150px] transition-all duration-[1.8s]  ${
                isActive ? "left-[50%]" : ""
              }`}
            ></div>

            {/* Left Panel */}
            <div
              className={` absolute left-0 w-1/2 h-full flex flex-col justify-end items-center text-black transition-all duration-500 delay-[0.6s] ${
                isActive ? "-left-1/2 delay-[1.2s]" : ""
              }`}
              style={{
                backgroundImage: `url(/Login-bro.png)`, // Replace with your image variable
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "500px",
                width: "400px",
              }}
            >
              <h1 className="text-2xl ">Welcome Back!</h1>
              <p className="mb-1">Sign in to continue to your account</p>
              <button
                onClick={() => setIsActive(!isActive)}
                className="w-40 h-12 bg-transparent border-2 border-black rounded-lg text-black font-semibold hover:bg-black hover:text-stone-100"
              >
                Sign In
              </button>
            </div>

            {/* Right Panel */}
            <div
              className={` absolute right-0 w-1/2 h-full flex flex-col justify-end mb-10 items-center text-black font-mono transition-all duration-500 delay-[1.2s] ${
                isActive ? "left-1/2 delay-[0.6s]" : ""
              }`}
              style={{
                backgroundImage: `url(/ignup-rafiki.png)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "500px",
                width: "400px",
              }}
            >
              <h1 className="text-2xl mb-3">Hello, Friend!</h1>
              <p className="mb-2">Sign up to create a new account</p>
              <button
                onClick={() => setIsActive(!isActive)}
                className=" hover:bg-black hover:text-stone-100 w-40 h-12 bg-transparent border-2 font-extrabold border-black rounded-lg text-black "
              >
                Sign Up
              </button>
            </div>
          </div>
          {/* Forms */}
          <div
            className={`absolute right-0 w-1/2 h-full bg-white flex flex-col justify-center items-center text-center p-10 transition-all duration-500 ${
              isActive ? "right-1/2" : ""
            }`}
          >
            <h1 className="text-3xl mb-5">Sign Up</h1>
            <Form status={isActive} />
          </div>

          <div
            className={`absolute right-[-50%] w-1/2 h-full bg-white flex flex-col justify-center items-center text-center p-10 transition-all duration-500 visibility-hidden ${
              isActive ? "left-1 visibility-visible" : ""
            }`}
          >
            <h1 className="text-3xl mb-5">Sign In</h1>
            <Form status={isActive} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
