import { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import axios from "axios";
import { useAuth } from "../../contextapi/UserAuth";
import Loader from "../../ui/Loader";
// Function to generate a random light color
// const getRandomLightColor = () => {
//   const hue = Math.floor(Math.random() * 360);
//   return `hsl(${hue}, 80%, 82%)`;
// };

export default function Groups({ userEmail }) {
  const { groups, setGroups, getRandomLightColor } = useAuth();
  const [loading, setLoading] = useState(true); // ✅ For group loading
  // Effect to track when userEmail is fully available
  useEffect(() => {
    if (!userEmail || userEmail.trim() === "") return; // ✅ Ensures userEmail is available

    const fetchGroups = async () => {
      try {
        setLoading(true); // ✅ Start loading
        console.log(`📡 Fetching groups for: ${userEmail}`);

        const res = await axios.get("http://localhost:5000/groups", {
          params: { email: userEmail },
        });

        console.log("📤 Received groups:", res.data);

        if (Array.isArray(res.data)) {
          setGroups(
            res.data.map((group) => ({
              ...group,
              color: getRandomLightColor(),
            }))
          );
        } else {
          console.warn("⚠️ API response is not an array. Ignoring update.");
        }
        setLoading(false); // ✅ Stop loading
      } catch (error) {
        // console.error("❌ Error fetching groups:", error);
        setGroups([]); // Ensure no stale data remains
      }
    };

    fetchGroups();
  }, [userEmail, setGroups]); // ✅ Runs only when `userEmail` changes and is non-empty

  return (
    <div className="px-3 w-fit">
      <h2 className="text-2xl font-bold mb-4">Groups</h2>
      {loading ? (
        <p className="h-[500px] w-[1000px] bg-orange-400 bg-opacity-10 flex items-center justify-center">
          <Loader />
        </p>
      ) : (
        <ul className="px-10 grid grid-cols-2 gap-10 items-start">
          {groups.length > 0 ? (
            groups.map((group, index) => (
              <GroupCard key={group.id || group._id || index} group={group} />
            ))
          ) : (
            <p className="text-gray-600 col-span-2 text-center">
              No groups created yet.
            </p>
          )}
        </ul>
      )}
    </div>
  );
}
