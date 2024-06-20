import { MenuService } from './menu.service';
import { GetMenuCategoriesResponse, GetMenuDetailById, GetPaginatedMenusByCategory } from './types/menu-response.type';
import { GetPaginatedMenusByCategoryQuery } from './types/menu-request.type';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    getMenuCategories(): Promise<GetMenuCategoriesResponse>;
    getPaginatedMenusByCategory(query: GetPaginatedMenusByCategoryQuery): Promise<GetPaginatedMenusByCategory>;
    getMenuDetailById(menuId: number): Promise<GetMenuDetailById>;
}
