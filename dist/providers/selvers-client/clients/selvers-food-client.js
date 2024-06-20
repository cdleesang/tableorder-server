"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelversFoodClient = void 0;
const page_not_found_error_1 = require("../errors/page-not-found.error");
const selvers_www_client_1 = require("./selvers-www-client");
const response_error_handle_util_1 = require("../utils/response-error-handle.util");
class SelversFoodClient extends selvers_www_client_1.SelversWWWClient {
    async getMenuCategory(storeId, storeMemberId) {
        const url = this.genFullPath('/api/tableOrder/v2/getStoreInfo2Depth.json');
        return await (0, response_error_handle_util_1.responseErrorHandle)('메뉴 카테고리 조회', this.httpService.get(url, {
            params: {
                member_id: storeMemberId,
                store_id: storeId,
            },
        }));
    }
    async getManyMenuByCategory(storeId, page, category1Depth, category2Depth) {
        const data = category2Depth
            ? await this.getManyMenuByCategory2Depth(storeId, page, category1Depth, category2Depth)
            : await this.getManyMenuByCategory1Depth(storeId, page, category1Depth);
        return {
            ...data,
            data: data.data.map(({ Food: food }) => ({
                Food: {
                    ...food,
                    image_uri: this.genFullPath(food.image_uri),
                },
            })),
        };
    }
    async getManyMenuByCategory1Depth(storeId, page, category1Depth) {
        const url = this.genFullPath('/spot/new_store_foods.json');
        const data = await (0, response_error_handle_util_1.responseErrorHandle)('메뉴 조회', this.httpService.post(url, {
            store_id: storeId,
            division_id: category1Depth,
            page,
        }), {
            store_food_division_id: category1Depth,
            page,
        }, {
            axiosHandler: err => {
                if (err.response?.status === 404) {
                    throw new page_not_found_error_1.PageNotFoundError();
                }
            },
            responseHandler: (res, logger, error) => {
                if (res.list)
                    return;
                if (res.message === 'Not Found') {
                    throw new page_not_found_error_1.PageNotFoundError();
                }
                logger();
                throw error;
            },
        });
        return {
            result: 'ok',
            message: 'ok',
            total_page: data.totalPage.toString(),
            data: data.list,
            page: data.page.toString(),
        };
    }
    async getManyMenuByCategory2Depth(storeId, page, category1Depth, category2Depth) {
        const url = this.genFullPath('/api/spot/v2/getStoreProducts2Depth.json');
        return await (0, response_error_handle_util_1.responseErrorHandle)('메뉴 조회', this.httpService.get(url, {
            params: {
                member_id: '',
                store_id: storeId,
                store_food_division_id: category1Depth,
                store_food_division_2depth_id: category2Depth,
                page,
            },
        }), {
            store_food_division_id: category1Depth,
            store_food_division_2depth_id: category2Depth,
            page,
        }, {
            axiosHandler: err => {
                if (err.response?.status === 404) {
                    throw new page_not_found_error_1.PageNotFoundError();
                }
            },
            responseHandler: (data, logger, error) => {
                if (data.data)
                    return;
                if (data.message === '등록된 DATA가 없습니다.') {
                    throw new page_not_found_error_1.PageNotFoundError();
                }
                logger();
                throw error;
            },
        });
    }
    async getMenuDetailById(menuId) {
        const url = this.genFullPath('/custom/food_detail.json');
        const params = new URLSearchParams();
        params.append('food_id', menuId.toString());
        const data = await (0, response_error_handle_util_1.responseErrorHandle)('메뉴 상세정보 조회', this.httpService.post(url, params), { menu_id: menuId });
        data.food.Food.image_uri = this.genFullPath(data.food.Food.image_uri);
        return data;
    }
}
exports.SelversFoodClient = SelversFoodClient;
//# sourceMappingURL=selvers-food-client.js.map