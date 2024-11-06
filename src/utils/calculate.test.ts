import { calculateExpression } from "./calculate";

describe("calculateExpression", () => {
  test("evaluates valid expressions correctly", () => {
    expect(calculateExpression("2+2")).toBe(4);
    expect(calculateExpression("2+2*3")).toBe(8);
    expect(calculateExpression("(2+2)*3")).toBe(12);
    expect(calculateExpression("10/2")).toBe(5);
    expect(calculateExpression("10/(2+3)")).toBe(2);
    expect(calculateExpression("2+3*4-5/2")).toBe(2 + 3 * 4 - 5 / 2);
  });

  test("returns null for invalid expressions", () => {
    expect(calculateExpression("2+")).toBeNull();
    expect(calculateExpression("2+*3")).toBeNull();
    expect(calculateExpression("2++2")).toBeNull();
    expect(calculateExpression("2+2a")).toBeNull(); // Invalid character
    expect(calculateExpression('alert("hi")')).toBeNull(); // Code injection attempt
  });

  test("prevents code injection", () => {
    expect(calculateExpression("process.exit()")).toBeNull();
    expect(calculateExpression("2; process.exit()")).toBeNull();
    expect(calculateExpression("2 + (function(){})()")).toBeNull();
  });

  test("returns null for division by zero", () => {
    expect(calculateExpression("1/0")).toBeNull(); // Infinity is not finite
  });

  test("returns null for expressions resulting in NaN", () => {
    expect(calculateExpression("0/0")).toBeNull(); // 0/0 is NaN
  });

  test("handles whitespace correctly", () => {
    expect(calculateExpression(" 2 + 2 ")).toBe(4);
    expect(calculateExpression("\t2\t+\t2\t")).toBe(4);
    expect(calculateExpression("\n2\n+\n2\n")).toBe(4);
  });

  test("handles negative numbers", () => {
    expect(calculateExpression("-2+3")).toBe(1);
    expect(calculateExpression("2+-3")).toBe(-1);
    expect(calculateExpression("(-2)+(-3)")).toBe(-5);
  });

  test("handles complex expressions", () => {
    expect(calculateExpression("((2+3)*4)/2")).toBe(10);
    expect(calculateExpression("3+(4*5)-6/2")).toBe(20);
  });
});
