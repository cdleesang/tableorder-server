import { Paginated, Pagination } from 'src/common/types/pagination.type';
import { SetMenu } from '../models/set-menu.model';
import { Menu } from '../models/menu.model';
import { MenuOption } from '../models/menu-option.model';

export interface SetMenuRepository {
  /** 세트메뉴 검색 */
  search(filter: SetMenuRepository.SearchSetMenuFilter, pagination: Pagination): Promise<SetMenuRepository.PaginatedSetMenu>;

  /** 단일 세트메뉴 조회 */
  findOne(setMenuId: SetMenu['id']): Promise<SetMenu | null>;

  /** 세트메뉴 생성 */
  create(setMenu: SetMenuRepository.CreateSetMenu): Promise<SetMenu['id']>;

  /** 세트메뉴 수정 */
  update(setMenuId: SetMenu['id'], setMenu: SetMenuRepository.UpdateSetMenu): Promise<void>;

  /** 세트메뉴 삭제 */
  delete(setMenuId: SetMenu['id']): Promise<void>;

  /** 세트메뉴 순서 변경 */
  reorder(setMenuId: SetMenu['id'], targetOrder: number): Promise<void>;
}

export namespace SetMenuRepository {
  export const InjectionToken = Symbol('SetMenuRepository');

  export type SearchSetMenuFilter = {
    /** 검색어(세트메뉴명 or id) */
    keyword?: string;
    isSoldOut?: boolean;
    isActive?: boolean;
  };

  export type PaginatedSetMenu = Paginated<Pick<
    SetMenu,
      | 'id'
      | 'thumbnailImageUrl'
      | 'name'
      | 'tags'
      | 'discount'
      | 'isDisplay'
      | 'availableDateRange'
      | 'availableTimeRange'
      | 'createdAt'
      | 'updatedAt'
  > & {
    minimumPrice: number;
    isSoldOut: boolean;
  }>;

  export type CreateSetMenu = Omit<SetMenu, 'id' | 'menuGroups' | 'optionGroups' | 'createdAt' | 'updatedAt'> & {
    menuGroups: {
      name: string;
      menuIds: Menu['id'][];
    }[];
    optionGroups: {
      name: Menu.OptionGroup['name'];
      isRequired: Menu.OptionGroup['isRequired'];
      multiSelect: Menu.OptionGroup['multiSelect'];
      optionIds: MenuOption['id'][];
    }[];
  };

  export type UpdateSetMenu = Partial<Omit<SetMenu, 'id' | 'menuGroups' | 'optionGroups' | 'createdAt' | 'updatedAt'>> & {
    menuGroups?: {
      add: {
        name: SetMenu.MenuGroup['name'];
        menuIds: Menu['id'][];
      }[];
      update: {
        id: SetMenu.MenuGroup['id'];
        name?: SetMenu.MenuGroup['name'];
        menuIds?: Menu['id'][];
      }[];
      delete: SetMenu.MenuGroup['id'][];
    };
    optionGroups?: {
      add: {
        name: SetMenu.OptionGroup['name'];
        isRequired: SetMenu.OptionGroup['isRequired'];
        multiSelect: SetMenu.OptionGroup['multiSelect'];
        optionIds: MenuOption['id'][];
      }[];
      update: {
        id: SetMenu.OptionGroup['id'];
        name?: SetMenu.OptionGroup['name'];
        isRequired?: SetMenu.OptionGroup['isRequired'];
        multiSelect?: SetMenu.OptionGroup['multiSelect'];
        optionIds?: MenuOption['id'][];
      }[];
      delete: SetMenu.OptionGroup['id'][];
    };
  };
}