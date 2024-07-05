export class InvalidParingCodeError extends Error {
  constructor() {
    super('Invalid paring code');
  }
}