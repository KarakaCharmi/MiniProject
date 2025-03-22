import { useAuth } from "../contextapi/UserAuth";

export const initialState = {
  groupName: "",
  groupDescription: "",
  members: [],
  currency: "",
  category: "",
  createdBy: "",
};
// const { groups } = useAuth();
export function groupReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_MEMBER":
      /*  if (
        action.email &&
        !state.members.includes(action.email) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.email)
      ) {
        return { ...state, members: [...state.members, action.email] };
      } */

      return { ...state, members: [...state.members, action.email] };
    case "REMOVE_MEMBER":
      return {
        ...state,
        members: state.members.filter((email) => email !== action.email),
      };
    case "RESET":
      return { ...initialState, createdBy: state.createdBy };
    case "DELETEGROUP":
      return {
        ...state,
        groups: state.groups.filter((group) => group._id !== action.value),
      };
    default:
      return state;
  }
}
