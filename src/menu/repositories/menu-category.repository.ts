import { PartialByKeys } from 'src/common/types/partial-by-keys.type';
import { MenuCategory } from '../models/menu-category.model';

export interface MenuCategoryRepository {
  /** 메뉴 카테고리 트리 조회 */
  getAllMenuCategoryTree(): Promise<MenuCategory.Tree[]>;

  /** 메인 카테고리 생성 */
  createMainCategory(mainCategory: MenuCategoryRepository.CreateMainCategory): Promise<MenuCategory.Main['id']>;
  /** 메인 카테고리 수정 */
  updateMainCategory(mainCategoryId: MenuCategory.Main['id'], mainCategory: MenuCategoryRepository.UpdateMainCategory): Promise<void>;
  /** 메인 카테고리 삭제 */
  deleteMainCategory(mainCategoryId: MenuCategory.Main['id']): Promise<void>;
  /**
   * 메인 카테고리 순서 변경
   * @param mainCategoryId 메인 카테고리 ID
   * @param targetOrder 변경할 순서 (ex. 현재가 2번째인데 0번째로 변경하고 싶다면 0)
   */
  reorderMainCategory(mainCategoryId: MenuCategory.Main['id'], targetOrder: number): Promise<void>;

  /** 서브 카테고리 생성 */
  createSubMenuCategory(mainCategoryId: MenuCategory.Main['id'], subCategory: MenuCategoryRepository.CreateSubMenuCategory): Promise<MenuCategory.Sub['id']>
  /** 서브 카테고리 수정 */
  updateSubMenuCategory(subCategoryId: MenuCategory.Sub['id'], subCategory: MenuCategoryRepository.UpdateSubMenuCategory): Promise<void>;
  /** 서브 카테고리 삭제 */
  deleteSubMenuCategory(subCategoryId: MenuCategory.Sub['id']): Promise<void>;
  /**
   * 서브 카테고리 순서 변경
   * @param subCategoryId 서브 카테고리 ID
   * @param targetOrder 변경할 순서 (ex. 현재가 2번째인데 0번째로 변경하고 싶다면 0)
   */
  reorderSubMenuCategory(subCategoryId: MenuCategory.Sub['id'], targetOrder: number): Promise<void>;
}

export namespace MenuCategoryRepository {
  export const InjectionToken = Symbol('MenuCategoryRepository');

  export type CreateMainCategory = Omit<PartialByKeys<MenuCategory.Main, 'order'>, 'id'>;

  export type UpdateMainCategory = Partial<Omit<MenuCategory.Main, 'id' | 'order'>>;

  export type CreateSubMenuCategory = Omit<PartialByKeys<MenuCategory.Sub, 'order'>, 'id'>;

  export type UpdateSubMenuCategory = Partial<Omit<MenuCategory.Sub, 'id' | 'order'>>;
}