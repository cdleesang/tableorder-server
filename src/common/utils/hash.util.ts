import * as bcrypt from 'bcryptjs';

export namespace Hash {
  export function hash(string: string): string {
    return bcrypt.hashSync(string, 10);
  }
  
  export function compare(string: string, hashedString: string): boolean {
    return bcrypt.compareSync(string, hashedString);
  }
}