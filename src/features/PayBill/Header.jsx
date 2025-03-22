import { useBillContext } from "./BillContextApi";
import CustomDropdown from "./CustomDrop";

function Header() {
  const { isReceipt, setIsReceipt } = useBillContext();
  return (
    <>
      <CustomDropdown
        options={["New Expenses", "New Expenses with Receipt"]}
        value={isReceipt}
        changeHandler={setIsReceipt}
      />
    </>
  );
}
export default Header;
