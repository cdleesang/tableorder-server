export class UniqueFieldDuplicateError extends Error {
  constructor(field: string) {
    super(`'${field}' field must be unique.`);
  }
}