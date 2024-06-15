export class AdminNotActiveError extends Error {
  constructor() {
    super('Admin is not active');
  }
}