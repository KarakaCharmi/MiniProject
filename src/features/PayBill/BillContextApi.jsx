import { createContext, useContext, useEffect, useState } from "react";

const BillContext = createContext();
function BillContextProvider({ children }) {
  const [amount, setAmount] = useState(0);
  const [whoPaid, setWhoPaid] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [isReceipt, setIsReceipt] = useState("");
  const [members, setMembers] = useState([]);
  const numOfMembers = members.length;
  const [numOfMembersChecked, setNumOfMembersChecked] = useState(numOfMembers);

  //useEffect hook
  useEffect(
    function () {
      setNumOfMembersChecked(numOfMembers);
    },
    [numOfMembers]
  );
  //Handler functions
  function totalAmount(amount) {
    setAmount(amount);
  }

  function whoPaidBill(member) {
    setWhoPaid(member);
  }

  function settingCurrency(currency) {
    setCurrency(currency);
  }
  function handleCheckedMembers(checked) {
    setNumOfMembersChecked(checked);
  }

  return (
    <BillContext.Provider
      value={{
        amount,
        whoPaid,
        currency,
        totalAmount,
        whoPaidBill,
        settingCurrency,
        isReceipt,
        setIsReceipt,
        members,
        setMembers,
        numOfMembers,
        numOfMembersChecked,
        handleCheckedMembers,
      }}
    >
      {children}
    </BillContext.Provider>
  );
}

function useBillContext() {
  const context = useContext(BillContext);
  if (context === undefined) throw new Error("COntext is used out of provider");
  return context;
}

export { BillContextProvider, useBillContext };
