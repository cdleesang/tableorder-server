import * as bcrypt from 'bcryptjs';

export class Hash {
  private static SALT_ROUNDS = 10;

  static hash(string: string): string {
    return bcrypt.hashSync(string, this.SALT_ROUNDS);
  }

  static compare(string: string, hashedString: string): boolean {
    return bcrypt.compareSync(string, hashedString);
  }
}