import Content from "./Content";
import Header from "./Header";

function PayBill({ opens }) {
  return (
    <div className="min-w-[40rem]  rounded-xl border-4 bg-slate-50 p-5 tracking-wider text-md">
      <div className="w-full">
        <Header />
        <Content opens={opens} />
      </div>
    </div>
  );
}
export default PayBill;
