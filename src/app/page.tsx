"use client";

import GameGrid from "@/components/GameGrid";
import HowToPlayModal from "@/components/HowToPlayModal";
import Keyboard from "@/components/Keyboard";
import useLocalStorage from "@/hooks/useLocalStorage";
import { calculateExpression } from "@/utils/calculate";
import { evaluateGuess, EvaluationResult } from "@/utils/evaluateGuess";
import { getDailyPuzzle } from "@/utils/puzzles";
import React, { useState, useEffect } from "react";

const HomePage: React.FC = () => {
  const solution = getDailyPuzzle();
  const [guesses, setGuesses] = useLocalStorage<string[]>("guesses", []);
  const [evaluations, setEvaluations] = useLocalStorage<EvaluationResult[]>(
    "evaluations",
    []
  );
  const [currentGuess, setCurrentGuess] = useState<string>("");

  const initialLines = [
    { type: "output", content: `$ Welcome back, hacker!` },
    {
      type: "output",
      content: `$ Your mission is to find the hidden calculation that equals ${calculateExpression(
        solution
      )}.`,
    },
  ];

  const [terminalLines, setTerminalLines] = useState<
    {
      type: string;
      content: string;
      subtype?: "error" | "success" | "info";
    }[]
  >([]);

  // Typing animation state
  const [displayedText, setDisplayedText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    // If all lines have been typed, exit the effect
    if (currentLineIndex >= initialLines.length) return;

    const currentLineContent = initialLines[currentLineIndex].content;
    const typingSpeed = 50; // Adjust typing speed (in milliseconds)

    // Type one character at a time
    const typingTimeout = setTimeout(() => {
      setDisplayedText((prev) => prev + currentLineContent[currentCharIndex]);
      setCurrentCharIndex((prev) => prev + 1);
    }, typingSpeed);

    // When the current line is fully typed
    if (currentCharIndex >= currentLineContent.length) {
      clearTimeout(typingTimeout);
      setDisplayedText((prev) => prev + "\n"); // Add a newline at the end of the line
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }

    return () => clearTimeout(typingTimeout);
  }, [currentCharIndex, currentLineIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      // Prevent input during typing effect
      if (currentLineIndex < initialLines.length) return;

      if (
        (key >= "0" && key <= "9") ||
        ["+", "-", "*", "/", "(", ")"].includes(key)
      ) {
        if (currentGuess.length < 8) {
          setCurrentGuess((prev) => prev + key);
        }
      } else if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === "Enter") {
        onEnter();
        setCurrentGuess("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, currentLineIndex]);

  const getTextColorClass = (line: { type: string; subtype?: string }) => {
    if (line.type === "command") return "text-green-500";
    if (line.subtype === "error") return "text-red-500";
    if (line.subtype === "success") return "text-green-500";
    if (line.subtype === "info") return "text-gray-500";
    return "text-white";
  };

  const onEnter = () => {
    if (currentGuess.length === 0) return;

    // Only proceed if typing effect is complete
    if (currentLineIndex < initialLines.length) return;

    // Reset terminalLines to include only the latest command and output
    setTerminalLines([
      { type: "command", content: currentGuess },
      { type: "output", content: "Processing...", subtype: "info" },
    ]);

    setTimeout(() => {
      const result = calculateExpression(currentGuess);
      const solutionResult = calculateExpression(solution);

      // Replace the "Processing..." message
      const newLines = [{ type: "command", content: currentGuess }];

      if (result === null) {
        // Invalid expression
        setTerminalLines([
          ...newLines,
          {
            type: "output",
            content: "bash: syntax error: invalid expression",
            subtype: "error",
          },
        ]);
        return;
      }

      if (result !== solutionResult) {
        // Incorrect result
        setTerminalLines([
          ...newLines,
          {
            type: "output",
            content: `Error: Calculation result does not equal ${solutionResult}`,
            subtype: "error",
          },
        ]);
        return;
      }

      // Correct guess
      const evaluation = evaluateGuess(currentGuess, solution);
      setGuesses([...guesses, currentGuess]);
      setEvaluations([...evaluations, evaluation]);

      setTerminalLines([
        ...newLines,
        {
          type: "output",
          content: "Command executed successfully",
          subtype: "success",
        },
      ]);

      if (currentGuess === solution || guesses.length + 1 === 6) {
        setTerminalLines([
          ...newLines,
          {
            type: "output",
            content: `Mission Complete! The solution was ${solution}`,
            subtype: "success",
          },
        ]);
      }
    }, 1000); // Simulate delay
  };

  const handleKeyPress = (key: string) => {
    // Prevent input during typing effect
    if (currentLineIndex < initialLines.length) return;

    if (key === "Enter") {
      onEnter();
    } else if (key === "C") {
      setCurrentGuess("");
    } else if (key === "=") {
      // Do nothing for now
    } else {
      if (currentGuess.length < 8) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-black text-green-500 font-mono overflow-hidden flex flex-col">
      <HowToPlayModal />
      {/* Terminal Header */}
      <div className="flex items-center h-6 bg-gray-900 px-2">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
        </div>
        <div className="mx-auto text-white text-sm">Terminal</div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        {/* Terminal Messages */}
        <div className="terminal-messages overflow-y-auto h-40 flex-shrink-0 ">
          <pre className="whitespace-pre-wrap">{displayedText}</pre>

          {/* Once typing is complete, display other messages and current input */}
          {currentLineIndex >= initialLines.length && (
            <>
              {terminalLines.map((line, index) => (
                <pre key={index} className={getTextColorClass(line)}>
                  {line.type === "command" ? `$ ${line.content}` : line.content}
                </pre>
              ))}
              {currentGuess && (
                <pre>
                  <span className="text-green-500">
                    $ {currentGuess}
                    <span className="animate-pulse">█</span>
                  </span>
                </pre>
              )}
            </>
          )}
        </div>

        {/* Game Grid */}
        <div className="flex flex-shrink-0 justify-center w-full sm:-mt-10">
          <GameGrid
            guesses={guesses}
            evaluations={evaluations}
            currentGuess={currentGuess}
          />
        </div>
      </div>

      {/* Keyboard */}
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default HomePage;
