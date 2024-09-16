import { GetPaginatedMenusByCategoryDto } from './get-paginated-menus-by-category.dto';

export namespace GetMenuDetailByIdDto {
  export interface Response extends GetPaginatedMenusByCategoryDto.Menu {
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
}