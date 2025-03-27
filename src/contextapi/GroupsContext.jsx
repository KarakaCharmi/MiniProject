import { createContext, useContext, useState } from "react";

const GroupsContext = createContext();
export function GroupsContextProvider({ children }) {
  const [groups, setGroups] = useState([]);

  //Updater function
  function createGroup(newGroup) {
    setGroups([...groups, newGroup]);
  }

  function fetchGroups(groups) {
    setGroups(groups);
  }
  return (
    <GroupsContext.Provider value={{ groups, createGroup, fetchGroups }}>
      {children}
    </GroupsContext.Provider>
  );
}
export function useGroups() {
  const data = useContext(GroupsContext);
  return data;
}
