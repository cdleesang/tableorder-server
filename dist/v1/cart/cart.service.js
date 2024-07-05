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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../../config/config.service");
const legacy_prisma_service_1 = require("../../common/modules/prisma/legacy-prisma.service");
const selvers_client_service_1 = require("../../common/modules/selvers-client/selvers-client.service");
let CartService = class CartService {
    configService;
    prismaService;
    selversClientService;
    constructor(configService, prismaService, selversClientService) {
        this.configService = configService;
        this.prismaService = prismaService;
        this.selversClientService = selversClientService;
    }
    async getAllCartItems(tableId) {
        const memberId = await this.prismaService.getMemberIdByTableId(tableId);
        const data = await this.selversClientService.cart.getManyCartItem(memberId, 1);
        return {
            cartItems: data.list.map(({ Cart: item }) => ({
                id: parseInt(item.id, 10),
                menuId: parseInt(item.Food.id, 10),
                menuName: item.Food.food_name,
                menuAmount: parseInt(item.amount, 10) || 1,
                menuTotalPrice: parseInt(item.price, 10) || 0,
                imageUrl: item.Food.image_uri,
                menuMainOption: {
                    id: parseInt(item.CartFood.food_price_opt_id, 10),
                    name: item.FoodPriceOpt.opt_name || '',
                    price: parseInt(item.FoodPriceOpt.opt_price, 10) || 0,
                },
                menuSubOptions: item.FoodOpt.reduce((prev, next) => {
                    return Array.isArray(next)
                        ? prev
                        : [
                            ...prev,
                            {
                                groupId: parseInt(next.id, 10),
                                groupName: next.food_opt_name,
                                optionId: parseInt(next.FoodOptItem.id, 10),
                                optionName: next.FoodOptItem.food_opt_item_name,
                                optionPrice: parseInt(next.FoodOptItem.food_opt_item_price, 10),
                            },
                        ];
                }, []),
            })),
        };
    }
    async addItem(tableId, menu) {
        const storeId = this.configService.get('STORE_ID');
        const memberId = await this.prismaService.getMemberIdByTableId(tableId);
        const { count } = await this.selversClientService.cart.getCartItemCount(memberId);
        if (count >= 10) {
            throw new common_1.ConflictException('장바구니에 더 이상 상품을 추가할 수 없습니다.');
        }
        await this.selversClientService.cart.addItem(storeId, memberId, {
            id: menu.id.toString(),
            amount: menu.amount,
            price: menu.totalPrice,
            priceOptionId: menu.mainOptionId.toString(),
            options: menu.subOptions.map(option => ({
                id: option.optionGroupId.toString(),
                itemId: option.optionId.toString(),
            })),
        });
        const { cartItems } = await this.getAllCartItems(tableId);
        const addedItem = cartItems.findLast(item => {
            return item.menuId === menu.id
                && item.menuAmount === menu.amount
                && item.menuTotalPrice === menu.totalPrice
                && item.menuMainOption.id === menu.mainOptionId
                && item.menuSubOptions.length === menu.subOptions.length
                && item.menuSubOptions.every(subOption => menu.subOptions.find(option => (option.optionGroupId === subOption.groupId)
                    && (option.optionId === subOption.optionId)));
        });
        if (!addedItem) {
            throw new common_1.InternalServerErrorException('상품 추가에 실패했습니다.');
        }
        return addedItem.id;
    }
    async deleteItemById(tableId, itemId) {
        const memberId = await this.prismaService.getMemberIdByTableId(tableId);
        return this.selversClientService.cart.deleteItem(memberId, itemId.toString());
    }
    async clearCart(tableId) {
        const memberId = await this.prismaService.getMemberIdByTableId(tableId);
        return this.selversClientService.cart.clearCart(memberId);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        legacy_prisma_service_1.LegacyPrismaService,
        selvers_client_service_1.SelversClientService])
], CartService);
//# sourceMappingURL=cart.service.js.map