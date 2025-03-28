import React from "react";
import { Ear } from "lucide-react";

const ListeningLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-1 space-y-1 relative">
      <div className="relative w-20 h-16 flex items-center justify-center">
        {/* Ear Icon */}
        <Ear
          className="text-blue-600 z-10 relative"
          size={32}
          strokeWidth={1.5}
        />

        {/* WiFi Wave Rings - Positioned to the right of the ear */}
        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 flex items-center">
          <div
            className="absolute w-12 h-12 border-2 border-blue-300 rounded-full animate-ping opacity-75"
            style={{ left: "100%", marginLeft: "4px" }}
          ></div>
          <div
            className="absolute w-8 h-8 border-2 border-blue-400 rounded-full animate-ping delay-100 opacity-75"
            style={{ left: "100%", marginLeft: "8px" }}
          ></div>
          <div
            className="absolute w-4 h-4 border-2 border-blue-500 rounded-full animate-ping delay-200 opacity-75"
            style={{ left: "100%", marginLeft: "12px" }}
          ></div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600 font-medium animate-pulse text-xs">
          Listening...
        </p>
      </div>

      {/* Rhythmically Moving Dots */}
      <div className="flex space-x-0.5">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce-custom"></div>
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce-custom delay-100"></div>
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce-custom delay-200"></div>
      </div>
    </div>
  );
};

export default ListeningLoader;
