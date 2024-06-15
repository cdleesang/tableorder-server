export class AdminPermissionDeniedError extends Error {
  constructor() {
    super('Permission denied');
  }
}