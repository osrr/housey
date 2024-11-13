export const containsInvalidCharacters = (value: string): boolean => {
  return /[^a-zA-Z0-9._,-]/.test(value);
};

export * from './firebase-functions';
