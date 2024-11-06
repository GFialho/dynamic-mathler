/**
 * Safely calculates the result of a mathematical expression.
 * Supports basic arithmetic operations and respects the order of operations.
 *
 * @param expression - The mathematical expression to evaluate.
 * @returns The numerical result of the expression, or null if invalid.
 */
export function calculateExpression(expression: string): number | null {
  try {
    // Basic validation to prevent code injection
    if (/[^0-9+\-*/().\s]/.test(expression)) return null;

    // Use of Function constructor for evaluation is generally unsafe.
    // Here, we mitigate risks by validating the expression beforehand.

    // eslint-disable-next-line no-new-func
    const result = Function(`'use strict'; return (${expression})`)();

    // Check if the result is a finite number
    return typeof result === "number" && isFinite(result) ? result : null;
  } catch (error) {
    console.error("Calculation error:", error);
    return null;
  }
}
