export class AdminRefreshTokenInfo {
  constructor(
    public readonly adminId: string,
    public readonly refreshToken: string,
    public readonly expiresAt: Date,
  ) {}
}