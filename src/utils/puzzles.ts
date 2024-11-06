/**
 * List of daily puzzles with their corresponding dates.
 * Each puzzle includes a date and the equation as a string.
 */
export const puzzles = [
  { date: "2023-10-01", equation: "2+3*4" },
  { date: "2023-10-02", equation: "5*2+1" },
  { date: "2023-10-03", equation: "8/2+6" },
  { date: "2023-10-04", equation: "7*(3-1)" },
  { date: "2023-10-05", equation: "(4+4)*2" },
  { date: "2023-10-06", equation: "9+1*5" },
  { date: "2023-10-07", equation: "6*6-6" },
  { date: "2023-10-08", equation: "10/2+5" },
  { date: "2023-10-09", equation: "3+3+3" },
  { date: "2023-10-10", equation: "4*5-10" },
];

/**
 * Retrieves the daily puzzle based on the current date.
 * If no puzzle is found for today's date, it returns a default puzzle.
 *
 * @returns The equation string for today's puzzle.
 */
export function getDailyPuzzle(): string {
  const today = new Date().toISOString().split("T")[0];
  const puzzle = puzzles.find((p) => p.date === today);
  return puzzle ? puzzle.equation : "2+3*4"; // Default puzzle if none found
}
