export declare class AdminRefreshTokenInfo {
    readonly adminId: string;
    readonly refreshToken: string;
    readonly expiresAt: Date;
    constructor(adminId: string, refreshToken: string, expiresAt: Date);
}
