import { useParams } from "react-router-dom";
import GroupDetails from "./GroupDetails";
const GroupCardInfo = () => {
  const { id } = useParams();
  return (
    <div>
      <GroupDetails id={id} />
    </div>
  );
};

export default GroupCardInfo;
