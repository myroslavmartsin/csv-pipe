export class WrongValueFormatError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'WrongValueFormatError';
  }
}

export const createErrorMessage = (
  message: string,
  actual: string,
  expected: string
) => {
  return `\n\n${message}\n\nActual: ${actual}\n\nExpected: ${expected}\n`;
};
