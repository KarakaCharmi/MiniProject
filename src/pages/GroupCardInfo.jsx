import { useParams } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";
import GroupDetails from "../features/Groupdetails/GroupDetails";
const GroupCardInfo = () => {
  const { id } = useParams();
  // const { groups } = useAuth();
  // const group = groups.find((g) => g._id === id);

  // if (!group) {
  //   return <div>Group not found</div>;
  // }

  return (
    <div>
      <GroupDetails id={id} />
    </div>
  );
};

export default GroupCardInfo;
