import React from "react";
import Tile from "./Tile";
import { EvaluationResult } from "@/utils/evaluateGuess";

interface GameGridProps {
  guesses: string[];
  evaluations: EvaluationResult[];
  currentGuess: string;
}

const GameGrid: React.FC<GameGridProps> = ({
  guesses,
  evaluations,
  currentGuess,
}) => {
  const totalRows = 6;
  const rows = Array.from({ length: totalRows }, (_, i) => {
    if (i < guesses.length) {
      return guesses[i];
    } else if (i === guesses.length) {
      return currentGuess;
    } else {
      return "";
    }
  });

  return (
    <div className="grid grid-rows-6 gap-1 text-black w-screen sm:w-1/2 self-center items-center justify-center">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-6 gap-1">
          {Array.from({ length: 6 }, (_, colIndex) => (
            <Tile
              key={colIndex}
              value={row[colIndex] || ""}
              status={evaluations[rowIndex]?.statuses[colIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
