export declare class Admin {
    readonly id: string;
    readonly signInId: string;
    private _hashedPassword;
    name: string;
    joinedAt: Date;
    constructor(id: string, signInId: string, _hashedPassword: string, name: string, joinedAt?: Date);
    static generateId(): string;
    get hashedPassword(): string;
    setPassword(password: string): void;
    validatePassword(password: string): boolean;
}
