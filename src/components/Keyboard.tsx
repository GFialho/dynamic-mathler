import React from "react";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

const keys = [
  ["1", "2", "3", "+", "-"],
  ["4", "5", "6", "*", "/"],
  ["7", "8", "9", "(", ")"],
  ["C", "0", "=", "Enter"],
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      {keys.map((row, idx) => (
        <div key={idx} className="flex space-x-2 mb-2">
          {row.map((key) => (
            <button
              key={key}
              className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-md flex items-center justify-center text-xl font-bold"
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
