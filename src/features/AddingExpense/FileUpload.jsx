import { useEffect, useState } from "react";
import { useBillContext } from "../../contextapi/BillContextApi";
import SpinnerMini from "../../ui/MiniSpinner";

const FileUpload = () => {
  const [fileName, setFileName] = useState("");
  const { setFile, receiptLoading } = useBillContext();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFileName(file ? file.name : "");
  };
  useEffect(
    function () {
      setFile(fileName);
    },
    [fileName]
  );
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      <label className="text-gray-700 font-medium w-28 shrink-0">
        Add Receipt:
      </label>
      <div className="relative w-full">
        <input
          type="file"
          id="file-upload"
          disabled={receiptLoading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
        />
        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white hover:border-blue-500 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-500">{fileName || "Choose file"}</span>
        </div>
      </div>
      {receiptLoading && <SpinnerMini></SpinnerMini>}
    </div>
  );
};
export default FileUpload;
