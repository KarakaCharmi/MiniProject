import { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import axios from "axios";
import { useAuth } from "../contextapi/UserAuth";

// Function to generate a random light color
const getRandomLightColor = () => {
  const hue = Math.floor(Math.random() * 360); // Random hue within 360-degree spectrum
  return `hsl(${hue}, 80%, 82%)`; // Light color with high saturation and brightness
};

export default function Groups({ userEmail }) {
  // const [groups, setGroups] = useState([]); // State to store groups
  const { groups, setGroups } = useAuth();
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/groups/${userEmail}`
        );
        setGroups(
          res.data.map((group) => ({ ...group, color: getRandomLightColor() }))
        ); // Assign color dynamically
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    if (userEmail) {
      fetchGroups();
    }
  }, [userEmail]);

  return (
    <div className="px-3 w-fit">
      <h2 className=" text-2xl font-bold mb-4 ">Groups</h2>
      <ul className="px-10 grid grid-cols-2 gap-10 items-start ">
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <GroupCard key={group.id || index} group={group} />
          ))
        ) : (
          <p className="text-gray-600 col-span-2 text-center">
            No groups created yet.
          </p>
        )}
      </ul>
    </div>
  );
}
