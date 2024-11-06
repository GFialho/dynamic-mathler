import React from "react";
import { FaHourglassEnd } from "react-icons/fa";

interface ProgressBarProps {
  level: number;
  totalLevels: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ level, totalLevels }) => {
  const progressPercentage = Math.floor((level / totalLevels) * 100);

  return (
    <div className="w-full mt-2">
      {/* Progress Bar */}
      <div className="bg-gray-700 rounded-full h-4 overflow-hidden border border-gray-600">
        <div
          className="bg-green-500 h-full"
          style={{ width: `${progressPercentage}%`, transition: "width 0.5s" }}
        ></div>
      </div>

      {/* Progress Text with Spinning Icon */}
      <div className="flex items-center mt-2 text-sm text-gray-200">
        <FaHourglassEnd className="animate-spin mr-2" />
        <span>Progress: {progressPercentage}% to hacking NASA</span>
      </div>
    </div>
  );
};

export default ProgressBar;
