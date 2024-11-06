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
  const [message, setMessage] = useState<string>("");

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
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess]);

  const onEnter = () => {
    if (currentGuess.length === 0) return;

    // Simulate processing delay
    setMessage("Processing...");
    setTimeout(() => {
      const result = calculateExpression(currentGuess);
      const solutionResult = calculateExpression(solution);

      if (result === null) {
        setMessage("Invalid command");
        return;
      }

      if (result !== solutionResult) {
        setMessage(`Command failed: Result does not equal ${solutionResult}`);
        return;
      }

      const evaluation = evaluateGuess(currentGuess, solution);
      setGuesses([...guesses, currentGuess]);
      setEvaluations([...evaluations, evaluation]);
      setCurrentGuess("");
      setMessage("");

      if (currentGuess === solution || guesses.length + 1 === 6) {
        setMessage(`Mission Complete! The solution was ${solution}`);
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
        <pre>
          <span className="text-green-500">
            {`$ Welcome back, hacker!\n$ Your mission is to find the hidden calculation that equals ${calculateExpression(
              solution
            )}.\n`}
          </span>
        </pre>

        {/* Game Grid */}
        <GameGrid
          guesses={guesses}
          evaluations={evaluations}
          currentGuess={currentGuess}
        />
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>

      {/* Keyboard */}
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default HomePage;
