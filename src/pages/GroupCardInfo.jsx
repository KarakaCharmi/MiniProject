import { useParams } from "react-router-dom";
import { useAuth } from "../contextapi/UserAuth";

const GroupCardInfo = ({ index }) => {
  const { id } = useParams();
  const { groups } = useAuth();
  console.log(groups[id]);
  return <div>Hi there {groups[id]}</div>;
};

export default GroupCardInfo;
