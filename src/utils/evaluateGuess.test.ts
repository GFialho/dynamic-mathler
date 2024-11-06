// @ts-nocheck
import { evaluateGuess } from "./evaluateGuess";

describe("evaluateGuess", () => {
  test('returns all "correct" for an exact match', () => {
    const result = evaluateGuess("123456", "123456");
    expect(result.statuses).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ]);
  });

  test('returns "present" for correct characters in wrong positions', () => {
    const result = evaluateGuess("654321", "123456");
    expect(result.statuses).toEqual([
      "present",
      "present",
      "present",
      "present",
      "present",
      "present",
    ]);
  });

  test('returns "absent" for characters not in the solution', () => {
    const result = evaluateGuess("abcdef", "123456");
    expect(result.statuses).toEqual([
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
    ]);
  });

  test("handles mixed statuses correctly", () => {
    const result = evaluateGuess("124356", "123456");
    expect(result.statuses).toEqual([
      "correct",
      "correct",
      "present",
      "present",
      "correct",
      "correct",
    ]);
  });

  test("handles guesses shorter than solution", () => {
    const result = evaluateGuess("123", "123456");
    expect(result.statuses).toEqual(["correct", "correct", "correct"]);
  });

  test("handles guesses longer than solution", () => {
    const result = evaluateGuess("1234567", "123456");
    expect(result.statuses).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
      "absent",
    ]);
  });

  test("handles empty strings", () => {
    const result = evaluateGuess("", "");
    expect(result.statuses).toEqual([]);
  });

  test("handles non-alphanumeric characters", () => {
    const result = evaluateGuess("1+2-3", "3-2+1");
    expect(result.statuses).toEqual([
      "present",
      "present",
      "correct",
      "present",
      "present",
    ]);
  });
});
