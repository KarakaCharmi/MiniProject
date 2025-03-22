export default function TotalSpent() {
  return (
    <div className="bg-cyan-50 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-gray-600 mb-2">Total spent</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-cyan-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="ml-4">
            <h3 className="font-bold">1 expense</h3>
          </div>
        </div>
        <p className="text-cyan-900 font-bold">₹700</p>
      </div>
    </div>
  );
}
