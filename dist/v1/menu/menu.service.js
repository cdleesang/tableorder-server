"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../../config/config.service");
const page_not_found_error_1 = require("../../common/modules/selvers-client/errors/page-not-found.error");
const selvers_client_service_1 = require("../../common/modules/selvers-client/selvers-client.service");
let MenuService = class MenuService {
    configService;
    selversClientService;
    constructor(configService, selversClientService) {
        this.configService = configService;
        this.selversClientService = selversClientService;
    }
    async getMenuCategories() {
        const storeId = this.configService.get('STORE_ID');
        const storeMemberId = this.configService.get('STORE_MEMBER_ID');
        const data = await this.selversClientService.food.getMenuCategory(storeId, storeMemberId);
        return data.data.StoreFoodDivision.map(division => {
            return {
                id: parseInt(division.id, 10),
                name: division.division_name,
                subCategories: division.children.map(division2 => {
                    return {
                        id: parseInt(division2.id, 10),
                        name: division2.division_name,
                    };
                }),
            };
        });
    }
    async getPaginatedMenusByCategory(page, categoryId, subCategoryId) {
        const storeId = this.configService.get('STORE_ID');
        const data = await (async () => {
            try {
                return await this.selversClientService.food.getManyMenuByCategory(storeId, page, categoryId, subCategoryId);
            }
            catch (err) {
                if (err instanceof page_not_found_error_1.PageNotFoundError) {
                    throw new common_1.NotFoundException('요청하신 페이지를 찾을 수 없습니다.');
                }
                throw err;
            }
        })();
        return {
            totalPage: parseInt(data.total_page, 10),
            menus: data.data.map(({ Food: food }) => ({
                id: parseInt(food.id, 10),
                name: food.food_name,
                engName: food.en_food_name,
                price: parseInt(food.price, 10),
                imageUrl: food.image_uri,
                isSoldOut: food.sold_out_yn === 'Y',
                isDisplay: true,
            })),
        };
    }
    async getMenuDetailById(menuId) {
        const { food: { Food: data } } = await this.selversClientService.food.getMenuDetailById(menuId);
        return {
            id: parseInt(data.id, 10),
            name: data.food_name,
            engName: data.en_food_name,
            description: data.food_info,
            price: parseInt(data.price, 10),
            imageUrl: data.image_uri,
            isDisplay: data.approval_yn === 'Y',
            isSoldOut: data.sold_out_yn === 'Y',
            mainOptions: data.FoodPriceOpt.map(({ FoodPriceOpt: option }) => ({
                id: parseInt(option.id, 10),
                name: option.opt_name,
                price: parseInt(option.opt_price, 10),
            })),
            subOptionGroups: data.FoodOpt.map(group => ({
                id: parseInt(group.id, 10),
                name: group.food_opt_name,
                isRequired: group.essential_yn === 'Y',
                ...(group.multi_yn === 'Y' && {
                    multiSelectOptions: {
                        min: parseInt(group.min_count, 10),
                        max: parseInt(group.max_count, 10),
                    },
                }),
                subOptions: group.FoodOptItem.map(item => ({
                    id: parseInt(item.id, 10),
                    name: item.food_opt_item_name,
                    price: parseInt(item.food_opt_item_price, 10),
                    isSoldOut: item.sold_out_yn === 'Y',
                })),
            })),
        };
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        selvers_client_service_1.SelversClientService])
], MenuService);
//# sourceMappingURL=menu.service.js.map