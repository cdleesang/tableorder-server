export namespace GetMenuCategoriesDto {
  export type Response = Category[];

  export interface Category {
    /** 메뉴 카테고리 아이디 */
    id: number;

    /** 메뉴 카테고리명 */
    name: string;

    /** 하위 카테고리들 */
    subCategories: {
      /** 하위 카테고리 아이디 */
      id: number;

      /** 하위 카테고리명 */
      name: string;
    }[];
  }
}