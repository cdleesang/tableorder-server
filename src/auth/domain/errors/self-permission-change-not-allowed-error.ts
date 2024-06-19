export class SelfPermissionChangeNotAllowedError extends Error {
  constructor() {
    super('Self permission change not allowed');
  }
}