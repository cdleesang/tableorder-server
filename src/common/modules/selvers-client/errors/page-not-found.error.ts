export class PageNotFoundError extends Error {
  constructor() {
    super('page not found');
  }
}