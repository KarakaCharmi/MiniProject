import { useParams } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";

const GroupCardInfo = () => {
  const { id } = useParams();
  const { groups } = useAuth();
  const group = groups.find((g) => g._id === id);

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div>
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      <p>Created By: {group.createdBy}</p>
    </div>
  );
};

export default GroupCardInfo;
