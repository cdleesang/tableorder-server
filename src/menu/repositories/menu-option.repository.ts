import { Paginated, Pagination } from 'src/common/types/pagination.type';
import { MenuOption } from '../models/menu-option.model';

export interface MenuOptionRepository {
  search(filter: MenuOptionRepository.SearchMenuOptionFilter, pagination: Pagination): Promise<MenuOptionRepository.PaginatedMenuOption>;

  findOne(optionId: MenuOption['id']): Promise<MenuOption | null>;

  create(option: MenuOptionRepository.CreateMenuOption): Promise<MenuOption['id']>;

  update(optionId: MenuOption['id'], option: MenuOptionRepository.UpdateMenuOption): Promise<void>;

  delete(optionId: MenuOption['id']): Promise<void>;
}

export namespace MenuOptionRepository {
  export const InjectionToken = Symbol('MenuOptionRepository');

  export type SearchMenuOptionFilter = {
    /** 검색어(옵션명 or id) */
    keyword?: string;
    isSoldOut?: boolean;
  };

  export type PaginatedMenuOption = Paginated<MenuOption>;

  export type CreateMenuOption = Omit<MenuOption, 'id' | 'createdAt' | 'updatedAt'>;

  export type UpdateMenuOption = Partial<Omit<MenuOption, 'id' | 'createdAt' | 'updatedAt'>>;
}