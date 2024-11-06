import { getPuzzleByLevel } from "./puzzles";

describe("getPuzzleByLevel", () => {
  test("returns the correct puzzle for valid levels", () => {
    expect(getPuzzleByLevel(1)).toBe("2+4+50");
    expect(getPuzzleByLevel(50)).toBe("7+8+10");
    expect(getPuzzleByLevel(100)).toBe("2*16-26");
  });

  test("returns a congratulatory message when levels exceed available puzzles", () => {
    expect(getPuzzleByLevel(101)).toBe(
      "Congratulations! You've completed all levels."
    );
    expect(getPuzzleByLevel(150)).toBe(
      "Congratulations! You've completed all levels."
    );
  });

  test("returns undefined or handles invalid levels gracefully", () => {
    expect(getPuzzleByLevel(0)).toBeUndefined();
    expect(getPuzzleByLevel(-1)).toBeUndefined();
    expect(getPuzzleByLevel(NaN)).toBeUndefined();
  });

  test("handles non-integer levels", () => {
    expect(getPuzzleByLevel(1.5)).toBe(undefined); 
    expect(getPuzzleByLevel(50.9)).toBe(undefined); 
  });
});
