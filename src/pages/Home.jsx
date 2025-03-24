import Button from "../components/Button";
import TravelImage from "../images/Trip-amico.png";
import { Typewriter } from "react-simple-typewriter";
// import Title from "../components/Navbar";
import { useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <div className="flex flex-col ">
        <main className="flex-1">
          <div className="mx-20 flex flex-row justify-between items-center">
            <div>
              <div className="mb-5">
                <h1 className="text-5xl font-semibold text-center leading-relaxed text-sky-950">
                  <Typewriter
                    words={[
                      "Split. Settle. Simplify.",
                      "Split the bill, not the friendship.",
                    ]}
                    loop={true}
                    typeSpeed={100}
                    deleteSpeed={30}
                    delaySpeed={1000}
                    cursor
                  />
                </h1>
              </div>
              {/* Static Input and Button */}
              <div className="pl-2 flex justify-between  w-[400px] border border-y-stone-200  rounded-xl hover:border-2 hover:border-cyan-700">
                <input
                  type="text"
                  placeholder="JohnDoe@gmail.com"
                  className="outline-none flex-grow "
                />
                <Link to="/login">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
            <img
              src={TravelImage}
              alt="Travel Illustration"
              className="w-full max-w-md mr-10 mt-10"
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
