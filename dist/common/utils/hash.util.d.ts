export declare class Hash {
    private static SALT_ROUNDS;
    static hash(string: string): string;
    static compare(string: string, hashedString: string): boolean;
}
