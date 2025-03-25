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
  const [checkedMembers, setCheckedMembers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  //useEffect hook
  useEffect(
    function () {
      setNumOfMembersChecked(numOfMembers);
      setCheckedMembers(members);
    },
    [numOfMembers, members]
  );
  let membersBill;
  if (numOfMembers > 0) {
    membersBill = new Array(numOfMembers).fill(0);
  }
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
  function handleSetChecked(checked) {
    setCheckedMembers(checked);
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
        handleSetChecked,
        checkedMembers,
        membersBill,
        isDisabled,
        setIsDisabled,
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
