import PayBill from "../features/PayBill/PayBill";
import Modal from "../ui/Modal";

function BillPay() {
  return (
    <Modal>
      <Modal.Open opens="payBill">
        <button className="border p-4">Pay Bill</button>
      </Modal.Open>
      <Modal.Window name="payBill">
        <PayBill />
      </Modal.Window>
    </Modal>
  );
}
export default BillPay;
