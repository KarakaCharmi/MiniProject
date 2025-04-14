import { useAuth } from "../contextapi/UserAuth";

export const initialState = {
  groupName: "",
  groupDescription: "",
  members: [],
  emails: [],
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
      return { ...state, members: [...state.members, action.member_name] };
    case "ADD_EMAIL":
      if (
        action.email &&
        !state.emails.includes(action.email) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.email)
      ) {
        return { ...state, emails: [...state.emails, action.email] };
      }
      return state;

    case "REMOVE_MEMBER":
      return {
        ...state,
        members: state.members.filter((email) => email !== action.member_name),
      };

    case "REMOVE_EMAIL":
      return {
        ...state,
        emails: state.emails.filter((email) => email !== action.email),
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
