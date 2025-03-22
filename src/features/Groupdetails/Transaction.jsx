export default function Transaction({ item }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-cyan-400 text-white rounded-full h-10 w-10 flex items-center justify-center">
          I
        </div>
        <div className="ml-4">
          <h3 className="font-bold text-cyan-900">Kfc</h3>
          <p className="text-gray-500 text-sm">Feb 27, 2025 4:23 PM</p>
          <p className="text-gray-500 text-sm">lalitha paid for</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-cyan-900 font-bold">₹700</p>
        <div className="flex items-center justify-end mt-2">
          <div className="bg-cyan-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
            D
          </div>
          <div className="bg-cyan-400 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs ml-1">
            I
          </div>
        </div>
      </div>
    </div>
  );
}
