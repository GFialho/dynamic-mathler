import { useState, useEffect } from "react";

/**
 * A custom hook that synchronizes a state variable with localStorage.
 *
 * @param key - The key under which the value is stored in localStorage.
 * @param initialValue - The initial value to use if none is found in localStorage.
 * @returns A tuple containing the current value and a setter function.
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      // If server-side rendering, return the initial value
      return initialValue;
    }
    try {
      // Get from localStorage by key
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or return initial value
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // If error, return initial value
      console.log(error);
      return initialValue;
    }
  });

  // Update localStorage when the state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Save state to localStorage
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.log(error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
