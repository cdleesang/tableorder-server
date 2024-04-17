import typia from 'typia';

interface MenuCategory {
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

export type GetMenuCategoriesResponse = MenuCategory[];

interface Menu {
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

export interface GetPaginatedMenusByCategory {
  totalPage: number;
  menus: Menu[];
}

interface MenuDetail extends Menu {
  /** 메뉴 설명 */
  description: string;

  /** 메뉴 메인 옵션(택 1) */
  mainOptions: {
    /** 옵션 아이디 */
    id: number;

    /** 옵션명 */
    name: string;

    /** 옵션 가격 */
    price: number;
  }[];

  /** 메뉴 서브 옵션 그룹 */
  subOptionGroups: {
    /** 서브 옵션 그룹 아이디 */
    id: number;

    /** 서브 옵션 그룹명 */
    name: string;

    /** 필수 선택 여부 */
    isRequired: boolean;

    /** 다중선택옵션(다중선택이 가능할 경우에만 존재하는 필드) */
    multiSelectOptions?: {
      /** 최소 다중선택 개수 */
      min: number;

      /** 최대 다중선택 개수 */
      max: number;
    };

    /** 서브 옵션 */
    subOptions: {
      /** 서브 옵션 아이디 */
      id: number;

      /** 서브 옵션명 */
      name: string;

      /** 서브 옵션 가격 */
      price: number;

      /** 서브 옵션 품절 여부 */
      isSoldOut: boolean;
    }[];
  }[];
}

export type GetMenuDetailById = MenuDetail;