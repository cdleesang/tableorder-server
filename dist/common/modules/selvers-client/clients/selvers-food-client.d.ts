import { SelversWWWClient } from './selvers-www-client';
import { MenuCategoryResponse, MenuDetailResponse } from '../types/selvers-food-response.type';
import { StoreId } from '../types/selvers-client.type';
export declare class SelversFoodClient extends SelversWWWClient {
    getMenuCategory(storeId: StoreId, storeMemberId: string): Promise<MenuCategoryResponse>;
    getManyMenuByCategory(storeId: StoreId, page: number, category1Depth: number, category2Depth?: number): Promise<{
        data: {
            Food: {
                image_uri: string;
                id: string;
                food_name: string;
                en_food_name: string;
                price: string;
                sold_out_yn: import("../../../types/boolean-string.type").BooleanString;
                ready_yn: import("../../../types/boolean-string.type").BooleanString;
            };
        }[];
        result: string;
        message: string;
        page: string;
        total_page: string;
    }>;
    private getManyMenuByCategory1Depth;
    private getManyMenuByCategory2Depth;
    getMenuDetailById(menuId: number): Promise<MenuDetailResponse>;
}
