import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import bg from "@/assets/bg.jpg";
import styles from "./HowToPlayModal.module.css";

const HowToPlayModal: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [typing, setTyping] = useState(true);
  const [closing, setClosing] = useState(false);

  const username = "user";
  const prompt = `${username}@ubuntu:~$ `;

  const terminalLines = [
    "Welcome to Mathler!",
    "",
    "You are on a top secret mission that requires hacking Nasa. You need to find the hidden calculation in 6 guesses!",
    "After each guess, the color of the tiles will change to show how close you are to the solution.",
    "",
    "Green tiles are in the correct place.",
    "Orange tiles are in the solution, but in a different place.",
    "Gray tiles are not in the solution.",
    "",
    "Calculate / or * before + or - (order of operations).",
    "",
    "Press Enter to start playing...",
  ];

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (typing) {
      const line = terminalLines[currentLine];
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index <= line.length) {
          setDisplayedText((prev) => prev + line.charAt(index));
          index++;
        } else {
          clearInterval(typeInterval);
          setDisplayedText((prev) => prev + "\n");
          if (currentLine < terminalLines.length - 1) {
            setCurrentLine((prev) => prev + 1);
          } else {
            setTyping(false);
          }
        }
      }, 10);

      return () => clearInterval(typeInterval);
    }
  }, [currentLine, typing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setClosing(true);
      setTimeout(() => setOpen(false), 500);
    }
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-cover bg-center w-screen h-screen bg-black">
          <Image
            src={bg}
            alt="bg"
            className="fixed hidden sm:bg-cover sm:inline"
          />
        </Dialog.Overlay>

        <Dialog.Content
          className={`fixed inset-0 flex items-center justify-center ${
            closing ? styles.dialogSlideOut : styles.dialogSlideIn
          }`}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="bg-black text-green-500 font-mono p-4 rounded-lg w-3/4 h-3/4 overflow-auto shadow-lg relative">
            {/* Terminal Header */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 flex items-center px-2 rounded-t-lg">
              <div className={styles.macButtons}>
                <span
                  className={`${styles.macButton} ${styles.closeButton}`}
                ></span>
                <span
                  className={`${styles.macButton} ${styles.minimizeButton}`}
                ></span>
                <span
                  className={`${styles.macButton} ${styles.fullscreenButton}`}
                ></span>
              </div>
              <div className="mx-auto text-white text-sm">Terminal</div>
            </div>

            {/* Terminal Content */}
            <pre className="mt-6 whitespace-pre-wrap">
              {displayedText}
              {typing ? (
                <span className="animate-pulse">█</span>
              ) : (
                <span>
                  {prompt}
                  <span className="animate-pulse">█</span>
                </span>
              )}
            </pre>

            <Dialog.Close asChild onClick={() => setOpen(false)}>
              <button className="absolute top-0 right-1 text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default HowToPlayModal;
