import typia from 'typia';

export namespace GetPaginatedMenusByCategoryDto {
  export interface Request {
    /** 조회할 페이지 */
    page: number & typia.tags.Type<'int32'> & typia.tags.Minimum<1>;

    /** 대분류 카테고리 아이디 */
    categoryId: number & typia.tags.Type<'int32'>;

    /** 중분류 카테고리 아이디 */
    subCategoryId?: number & typia.tags.Type<'int32'>;
  }

  export interface Response {
    totalPage: number;
    menus: Menu[];
  }

  export interface Menu {
    /** 메뉴 아이디 */
    id: number;

    /** 메뉴명 */
    name: string;

    /** 메뉴 영문명 */
    engName: string;

    /** 메뉴 가격 */
    price: number;

    /** 메뉴 이미지 url */
    imageUrl: string & typia.tags.Format<'url'>;

    /** 메뉴 노출 여부 */
    isDisplay: boolean;

    /** 메뉴 품절 여부 */
    isSoldOut: boolean;
  }
}