import { TypedException, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, NotFoundException, VERSION_NEUTRAL } from '@nestjs/common';
import { GetMenuCategoriesDto, GetMenuDetailByIdDto, GetPaginatedMenusByCategoryDto } from './dto';
import { MenuService } from './menu.service';

@Controller({path: 'menu', version: VERSION_NEUTRAL})
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * 메뉴 카테고리 조회.
   * 
   * @tag 메뉴
   */
  @TypedRoute.Get('category')
  async getMenuCategories(): Promise<GetMenuCategoriesDto.Response> {
    return this.menuService.getMenuCategories();
  }

  /**
   * 페이징된 메뉴 카테고리로 조회.
   * 
   * @tag 메뉴
   */
  @TypedRoute.Get()
  @TypedException<NotFoundException>(404, '해당 페이지를 찾을 수 없음')
  async getPaginatedMenusByCategory(
    @TypedQuery() query: GetPaginatedMenusByCategoryDto.Request,
  ): Promise<GetPaginatedMenusByCategoryDto.Response> {
    return this.menuService.getPaginatedMenusByCategory(query.page, query.categoryId, query.subCategoryId);
  }

  /**
   * 아이디로 메뉴 상세정보 조회.
   * 
   * @tag 메뉴
   */
  @TypedRoute.Get(':id')
  async getMenuDetailById(@TypedParam('id') menuId: number): Promise<GetMenuDetailByIdDto.Response> {
    return this.menuService.getMenuDetailById(menuId);
  }
}