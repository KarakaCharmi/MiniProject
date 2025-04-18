import { useState } from "react";
const teamMembers = [
  {
    name: "Bhagya",
    role: "Project Manager",
    img: "/bhagya.jpg",
  },
  {
    name: "Charmi",
    role: "Frontend Developer",
    img: "/charmi.jpg",
  },
  {
    name: "Dheekshitha",
    role: "Backend Developer",
    img: "/deek.jpg",
  },
  {
    name: "Devi",
    role: "UI/UX Designer",
    img: "/image.png",
  },
  {
    name: "Parvathi",
    role: "ML Engineer",
    img: "/Parvathi.png",
  },
];

const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div className="bg-gray-900 text-white flex flex-col items-center p-20 min-h-screen">
        <h2 className="text-4xl font-bold mb-10">Meet Our Team</h2>
        <div className="flex gap-5">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`relative bg-gray-800 p-5 rounded-xl transition-all duration-300 overflow-hidden ${
                hoveredIndex === index
                  ? "w-64 shadow-[0_0_15px_rgba(0,255,255,0.8)] scale-105"
                  : "w-40"
              } h-72 flex flex-col items-center cursor-pointer`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={member.img}
                alt={member.name}
                className={`rounded-full object-cover mb-4 transition-transform duration-300 border-4 ${
                  hoveredIndex === index
                    ? "w-36 h-36 border-cyan-400"
                    : "w-28 h-28 border-gray-600"
                }`}
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
