"use client";

import GameGrid from "@/components/GameGrid";
import HowToPlayModal from "@/components/HowToPlayModal";
import Keyboard from "@/components/Keyboard";
import useLocalStorage from "@/hooks/useLocalStorage";
import { calculateExpression } from "@/utils/calculate";
import { evaluateGuess, EvaluationResult } from "@/utils/evaluateGuess";
import { getDailyPuzzle } from "@/utils/puzzles";
import React, { useState, useEffect } from "react";

const getTextColorClass = (line: { type: string; subtype?: string }) => {
  if (line.type === "command") return "text-green-500";
  if (line.subtype === "error") return "text-red-500";
  if (line.subtype === "success") return "text-green-500";
  if (line.subtype === "info") return "text-gray-500";
  return "text-white";
};

const HomePage: React.FC = () => {
  const solution = getDailyPuzzle();
  const [guesses, setGuesses] = useLocalStorage<string[]>("guesses", []);
  const [evaluations, setEvaluations] = useLocalStorage<EvaluationResult[]>(
    "evaluations",
    []
  );
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [terminalLines, setTerminalLines] = useState<
    {
      type: "command" | "output";
      content: string;
      subtype?: "error" | "success" | "info";
    }[]
  >([
    { type: "output", content: `$ Welcome back, hacker!` },
    {
      type: "output",
      content: `$ Your mission is to find the hidden calculation that equals ${calculateExpression(
        solution
      )}.`,
    },
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

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
  }, [currentGuess]);

  const onEnter = () => {
    if (currentGuess.length === 0) return;

    // Add the current guess as a command in the terminal
    setTerminalLines((prevLines) => [
      ...prevLines,
      { type: "command", content: currentGuess },
      { type: "output", content: "Processing...", subtype: "info" },
    ]);

    setCurrentGuess("");

    setTimeout(() => {
      const result = calculateExpression(currentGuess);
      const solutionResult = calculateExpression(solution);

      // Remove the "Processing..." message
      setTerminalLines((prevLines) => prevLines.slice(0, -1));

      if (result === null) {
        // Invalid expression
        setTerminalLines((prevLines) => [
          ...prevLines,
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
        setTerminalLines((prevLines) => [
          ...prevLines,
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

      setTerminalLines((prevLines) => [
        ...prevLines,
        {
          type: "output",
          content: "Command executed successfully",
          subtype: "success",
        },
      ]);

      if (currentGuess === solution || guesses.length + 1 === 6) {
        setTerminalLines((prevLines) => [
          ...prevLines,
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
    <div className="w-full h-screen bg-black text-green-500 font-mono overflow-hidden">
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
      <div className="p-4">
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

        {/* Game Grid */}
        <GameGrid
          guesses={guesses}
          evaluations={evaluations}
          currentGuess={currentGuess}
        />
      </div>

      {/* Keyboard */}
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default HomePage;
