import GroupCard from "./GroupCard";

// Function to generate a random light color
const getRandomLightColor = () => {
  const hue = Math.floor(Math.random() * 500); // Random hue
  return `hsl(${hue}, 80%, 82%)`; // Light color with high saturation and brightness
};

export default function Groups() {
  const groups = [
    {
      id: 1,
      name: "Weekend Trip",
      description: "Planning a weekend getaway with friends.",
      members: ["alice@example.com", "bob@example.com"],
      currency: "USD",
      category: 3,
      color: getRandomLightColor(), // Assigning a random light color
      amountOwed: 0,
    },
    {
      id: 2,
      name: "Godavari",
      description: "Planning a weekend getaway with friends.",
      members: ["alice@example.com", "bob@example.com"],
      currency: "USD",
      category: 2,
      color: getRandomLightColor(),
      amountOwed: 0,
    },
    {
      id: 3,
      name: "Field Trip",
      description: "Planning a weekend getaway with friends.",
      members: ["alice@example.com", "bob@example.com"],
      currency: "USD",
      category: 0,
      color: getRandomLightColor(),
      amountOwed: 0,
    },
    {
      id: 4,
      name: "Office",
      description: "Planning a weekend getaway with friends.",
      members: ["alice@example.com", "bob@example.com"],
      currency: "USD",
      category: 1,
      color: getRandomLightColor(),
      amountOwed: 0,
    },
    {
      id: 5,
      name: "Weekend Tirupathi",
      description: "Planning a weekend getaway with friends.",
      members: ["alice@example.com", "bob@example.com"],
      currency: "USD",
      category: 2,
      color: getRandomLightColor(),
      amountOwed: 0,
    },
  ];

  return (
    <ul className="flex flex-wrap pl-[10%] gap-10 ">
      {groups.map((group) => (
        <GroupCard group={group} key={group.id} />
      ))}
    </ul>
  );
}
