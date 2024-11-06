import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const HowToPlayModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center text-black">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Close Button */}
            <Dialog.Close asChild>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </Dialog.Close>

            {/* Modal Header */}
            <Dialog.Title className="text-xl font-bold mb-4">
              How to Play Mathler
            </Dialog.Title>

            {/* Modal Content */}
            <p className="mb-4">
              Try to find the hidden calculation in 6 guesses!
            </p>
            <p className="mb-4">
              After each guess, the color of the tiles will change to show how
              close you are to the solution.
            </p>

            {/* Example Tile Row */}
            <div className="flex space-x-1 mb-4 justify-center">
              <div className="w-10 h-10 flex items-center justify-center text-white font-bold bg-green-500 rounded">
                3
              </div>
              <div className="w-10 h-10 flex items-center justify-center text-white font-bold bg-gray-500 rounded">
                7
              </div>
              <div className="w-10 h-10 flex items-center justify-center text-white font-bold bg-green-500 rounded">
                -
              </div>
              <div className="w-10 h-10 flex items-center justify-center text-white font-bold bg-yellow-500 rounded">
                6
              </div>
              <div className="w-10 h-10 flex items-center justify-center text-white font-bold bg-gray-500 rounded">
                1
              </div>
            </div>

            {/* Explanation */}
            <ul className="text-sm mb-4 space-y-2">
              <li>
                <span className="font-bold text-green-500">Green</span> are in
                the correct place.
              </li>
              <li>
                <span className="font-bold text-yellow-500">Orange</span> are in
                the solution, but in a different place.
              </li>
              <li>
                <span className="font-bold text-gray-500">Gray</span> are not in
                the solution.
              </li>
              <li>
                Calculate <code>/</code> or <code>*</code> before <code>+</code>{" "}
                or <code>-</code> (order of operations).
              </li>
            </ul>

            {/* Play Button */}
            <Dialog.Close asChild onClick={() => setOpen(false)}>
              <button className="w-full py-2 bg-black text-white font-bold rounded-md mt-4">
                Play Mathler Now
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default HowToPlayModal;
