export interface MenuOption {
  readonly id: string;

  /** 옵션명 */
  name: string;

  /** 가격 */
  price: number;

  /** 품절 상태 */
  soldOut: {
    releaseDate: Date | null;
  } | false;

  createdAt: Date;
  updatedAt: Date;
}

export namespace MenuOption {
  export function isSoldOut({soldOut}: Pick<MenuOption, 'soldOut'>): boolean {
    if(soldOut === false) return false;
    if(soldOut.releaseDate && new Date() > soldOut.releaseDate) return false;

    return true;
  }
}