import { Paginated, Pagination } from 'src/common/types/pagination.type';
import { MenuCategory } from '../models/menu-category.model';
import { MenuOption } from '../models/menu-option.model';
import { Menu } from '../models/menu.model';

export interface MenuRepository {
  /** 메뉴 검색 */
  search(filter: MenuRepository.SearchMenuFilter, pagination: Pagination): Promise<MenuRepository.PaginatedMenu>;

  /** 단일 메뉴 조회 */
  findOne(menuId: Menu['id']): Promise<Menu | null>;

  /** 메뉴 생성 */
  create(menu: MenuRepository.CreateMenu): Promise<Menu['id']>;

  /** 메뉴 수정 */
  update(menuId: Menu['id'], menu: MenuRepository.UpdateMenu): Promise<void>;
  
  /** 메뉴 삭제 */
  delete(menuId: Menu['id']): Promise<void>;

  /** 메뉴 순서 변경 */
  reorder(menuId: Menu['id'], targetOrder: number): Promise<void>;
}

export namespace MenuRepository {
  export const InjectionToken = Symbol('MenuRepository');
  
  export type SearchMenuFilter = {
    /** 검색어(메뉴명 or id) */
    keyword?: string;
    category?: {
      mainCategoryId: MenuCategory.Main['id'];
      subCategoryId?: MenuCategory.Sub['id'];
    };
    isSoldOut?: boolean;
    isDisplay?: boolean;
    isDeleted?: boolean;
  }

  export type PaginatedMenu = Paginated<Pick<
    Menu,
      | 'id'
      | 'thumbnailImageUrl'
      | 'name'
      | 'price'
      | 'tags'
      | 'category'
      | 'soldOut'
      | 'isDisplay'
      | 'availableDateRange'
      | 'availableTimeRange'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
  >>;

  export type CreateMenu = Omit<Menu, 'id' | 'category' | 'optionGroups' | 'order' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
    order?: number;
    category: {
      mainCategoryId: MenuCategory.Main['id'];
      subCategoryId: MenuCategory.Sub['id'] | null;
    } | null;
    optionGroups: {
      name: Menu.OptionGroup['name'];
      isRequired: Menu.OptionGroup['isRequired'];
      multiSelect: Menu.OptionGroup['multiSelect'];
      optionIds: MenuOption['id'][];
    }[];
  };

  export type UpdateMenu = Partial<Omit<Menu, 'id' | 'category' | 'optionGroups' | 'order' | 'createdAt' | 'updatedAt' | 'deletedAt'>> & {
    category?: {
      mainCategoryId: MenuCategory.Main['id'];
      subCategoryId: MenuCategory.Sub['id'] | null;
    } | null;
    optionGroups?: {
      add: {
        name: Menu.OptionGroup['name'];
        isRequired: Menu.OptionGroup['isRequired'];
        multiSelect: Menu.OptionGroup['multiSelect'];
        optionIds: MenuOption['id'][];
      }[];
      update: {
        id: Menu.OptionGroup['id'];
        name?: Menu.OptionGroup['name'];
        isRequired?: Menu.OptionGroup['isRequired'];
        multiSelect?: Menu.OptionGroup['multiSelect'];
        optionIds?: MenuOption['id'][];
      }[];
      delete: Menu.OptionGroup['id'][];
    }
  };
}