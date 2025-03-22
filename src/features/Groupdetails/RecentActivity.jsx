export default function RecentActivity() {
  return (
    <div className="bg-cyan-50 p-4 rounded-lg shadow-md">
      <h2 className="text-gray-600 mb-2">Recent activity</h2>
      <div className="flex items-center mb-4">
        <div className="bg-cyan-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
          D
        </div>
        <div className="ml-4">
          <p className="font-bold">
            Dheekshita Kottu added an expense: Kfc (₹700)
          </p>
          <p className="text-gray-500 text-sm">Feb 27, 2025 4:23 PM</p>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="bg-cyan-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
          D
        </div>
        <div className="ml-4">
          <p className="font-bold">
            Dheekshita Kottu changed a member: dheekshita
          </p>
          <p className="text-gray-500 text-sm">Feb 27, 2025 4:23 PM</p>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="bg-cyan-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
          D
        </div>
        <div className="ml-4">
          <p className="font-bold">Dheekshita Kottu joined the group</p>
          <p className="text-gray-500 text-sm">Feb 27, 2025 4:23 PM</p>
        </div>
      </div>
    </div>
  );
}
