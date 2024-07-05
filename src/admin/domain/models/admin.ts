import { nanoid } from 'nanoid';
import { Hash } from 'src/common/utils/hash.util';

export class Admin {
  constructor(
    public readonly id: string,
    public readonly signInId: string,
    private _hashedPassword: string,
    public name: string,
    public joinedAt: Date = new Date(),
  ) {}

  static generateId(): string {
    return nanoid();
  }

  get hashedPassword(): string {
    return this._hashedPassword;
  }

  setPassword(password: string) {
    this._hashedPassword = Hash.hash(password);
  }

  validatePassword(password: string): boolean {
    return Hash.compare(password, this._hashedPassword);
  }
}