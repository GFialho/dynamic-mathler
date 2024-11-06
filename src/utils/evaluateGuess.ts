export type EvaluationStatus = "correct" | "present" | "absent";

export interface EvaluationResult {
  statuses: EvaluationStatus[];
}

/**
 * Evaluates the user's guess against the solution.
 *
 * @param guess - The user's guess expression as a string.
 * @param solution - The solution expression as a string.
 * @returns An EvaluationResult containing an array of statuses.
 */
export function evaluateGuess(
  guess: string,
  solution: string | undefined
): EvaluationResult {
  const guessChars = guess.split("");
  const statuses: EvaluationStatus[] = new Array(guessChars.length).fill(
    "absent"
  );

  if (!solution)
    return {
      statuses,
    };

  const solutionChars = solution.split("");

  // Map to keep track of character counts in the solution
  const solutionCharCount: { [char: string]: number } = {};

  // Count occurrences of each character in the solution
  for (const char of solutionChars) {
    solutionCharCount[char] = (solutionCharCount[char] || 0) + 1;
  }

  // First pass: Identify correct positions (green tiles)
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === solutionChars[i]) {
      statuses[i] = "correct";
      solutionCharCount[guessChars[i]]--;
    }
  }

  // Second pass: Identify present characters (yellow tiles)
  for (let i = 0; i < guessChars.length; i++) {
    if (statuses[i] === "correct") continue; // Skip already matched characters

    const guessChar = guessChars[i];
    if (solutionCharCount[guessChar]) {
      statuses[i] = "present";
      solutionCharCount[guessChar]--;
    }
  }

  return { statuses };
}
