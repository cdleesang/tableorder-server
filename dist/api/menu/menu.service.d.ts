import { ConfigService } from '../../config/config.service';
import { SelversClientService } from '../../providers/selvers-client/selvers-client.service';
import { GetMenuCategoriesResponse, GetMenuDetailById, GetPaginatedMenusByCategory } from './types/menu-response.type';
export declare class MenuService {
    private readonly configService;
    private readonly selversClientService;
    constructor(configService: ConfigService, selversClientService: SelversClientService);
    getMenuCategories(): Promise<GetMenuCategoriesResponse>;
    getPaginatedMenusByCategory(page: number, categoryId: number, subCategoryId?: number): Promise<GetPaginatedMenusByCategory>;
    getMenuDetailById(menuId: number): Promise<GetMenuDetailById>;
}
