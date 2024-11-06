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
    <div className="flex flex-wrap mt-4 self-center w-full justify-center fixed bottom-10">
      {keys.flat().map((key) => (
        <button
          key={key}
          className="w-12 h-12 bg-gray-800 text-green-500 m-1 rounded"
          onClick={() => onKeyPress(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
