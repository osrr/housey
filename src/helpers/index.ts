export const containsInvalidCharacters = (value: string): boolean => {
  return !/[^a-zA-Z0-9._,-]/.test(value);
};

export const isEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const measureExecutionTime = <T>(fn: () => T): T => {
  const start = performance.now(); // Start timer
  const result = fn(); // Run your function
  const end = performance.now(); // End timer
  console.log(`Execution time: ${(end - start).toFixed(2)} ms`);
  return result; // Return result if needed
};

export * from './firebase-functions';
