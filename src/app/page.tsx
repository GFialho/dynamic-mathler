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

    const result = calculateExpression(currentGuess);
    const solutionResult = calculateExpression(solution);

    if (result === null) {
      setMessage("Invalid Expression");
      return;
    }

    if (result !== solutionResult) {
      setMessage(`Expression does not equal ${solutionResult}`);
      return;
    }

    const evaluation = evaluateGuess(currentGuess, solution);
    setGuesses([...guesses, currentGuess]);
    setEvaluations([...evaluations, evaluation]);
    setCurrentGuess("");
    setMessage("");

    if (currentGuess === solution || guesses.length + 1 === 6) {
      setMessage(`Game Over! The solution was ${solution}`);
    }
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
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">Mathler Clone</h1>
      <p className="text-center mb-4">
        Find the hidden calculation that equals {calculateExpression(solution)}
      </p>
      <HowToPlayModal />

      <GameGrid
        guesses={guesses}
        evaluations={evaluations}
        currentGuess={currentGuess}
      />
      {message && <p className="text-red-500 text-center mt-4">{message}</p>}
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default HomePage;
