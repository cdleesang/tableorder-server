export class SignInFailedError extends Error {
  constructor() {
    super('Sign in failed');
  }
}