import { useBillContext } from "./BillContextApi";
import CustomDropdown from "./CustomDrop";

function Header() {
  const { amountOrReceipt, setAmountOrReceipt } = useBillContext();
  return (
    <>
      <CustomDropdown
        options={["New Expenses", "New Expenses with Receipt"]}
        value={amountOrReceipt}
        changeHandler={setAmountOrReceipt}
      />
    </>
  );
}
export default Header;
