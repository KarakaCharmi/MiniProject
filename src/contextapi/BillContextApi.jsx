import { createContext, useContext, useEffect, useState } from "react";

const BillContext = createContext();
function BillContextProvider({ children }) {
  const [amount, setAmount] = useState(0);
  const [whoPaid, setWhoPaid] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [amountOrReceipt, setAmountOrReceipt] = useState("New Expenses");
  const [members, setMembers] = useState([]);
  const numOfMembers = members.length;
  const [numOfMembersChecked, setNumOfMembersChecked] = useState(numOfMembers);
  const [checkedMembers, setCheckedMembers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [fileName, setFileName] = useState("");
  const [receiptLoading, setReceiptLoading] = useState(false);
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
  function setFile(file) {
    setFileName(file);
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
        amountOrReceipt,
        setAmountOrReceipt,
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
        fileName,
        setFile,
        receiptLoading,
        setReceiptLoading,
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
