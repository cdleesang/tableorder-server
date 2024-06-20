"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelversCartClient = void 0;
const common_1 = require("@nestjs/common");
const page_not_found_error_1 = require("../errors/page-not-found.error");
const response_error_handle_util_1 = require("../utils/response-error-handle.util");
const selvers_www_client_1 = require("./selvers-www-client");
let SelversCartClient = class SelversCartClient extends selvers_www_client_1.SelversWWWClient {
    async getCartItemCount(memberId) {
        const url = this.genFullPath('/cart/total_count.json');
        const params = new URLSearchParams();
        params.append('member_id', memberId);
        return await (0, response_error_handle_util_1.responseErrorHandle)('장바구니 개수 조회', this.httpService.post(url, params), { memberId }, {
            responseHandler() {
            },
        });
    }
    async getManyCartItem(memberId, page) {
        const url = this.genFullPath('/cart/index.json');
        const params = new URLSearchParams();
        params.append('member_id', memberId);
        params.append('page', page.toString());
        const data = await (0, response_error_handle_util_1.responseErrorHandle)('장바구니 조회', this.httpService.post(url, params), { memberId, page }, {
            axiosHandler: err => {
                if (err.response?.status === 404) {
                    throw new page_not_found_error_1.PageNotFoundError();
                }
            },
            responseHandler: (res, logger, error) => {
                if (res.list)
                    return;
                logger();
                throw error;
            },
        });
        return {
            ...data,
            list: data.list.map(({ Cart: item }) => ({
                Cart: {
                    ...item,
                    Food: {
                        ...item.Food,
                        image_uri: this.genFullPath(item.Food.image_uri),
                    },
                },
            })),
        };
    }
    async addItem(storeId, memberId, food) {
        const url = this.genFullPath('/cart/add.json');
        const params = new URLSearchParams();
        params.append('store_id', storeId);
        params.append('member_id', memberId);
        params.append('amount', food.amount.toString());
        params.append('price', food.price.toString());
        params.append('food_id', food.id);
        params.append('food_price_opt_id', food.priceOptionId);
        food.options.forEach((option, index) => {
            params.append(`food_opt_id[${index}]`, option.id);
            params.append(`food_opt_item_id[${index}]`, option.itemId);
        });
        await (0, response_error_handle_util_1.responseErrorHandle)('장바구니 상품 추가', this.httpService.post(url, params), { memberId });
        return true;
    }
    async deleteItem(memberId, cartId) {
        const url = this.genFullPath('/cart/del.json');
        const params = new URLSearchParams();
        params.append('member_id', memberId);
        params.append('cart_id', cartId);
        await (0, response_error_handle_util_1.responseErrorHandle)('장바구니 상품 삭제', this.httpService.post(url, params), {
            memberId,
            cartId,
        });
        return true;
    }
    async clearCart(memberId) {
        const url = this.genFullPath('/cart/all_del.json');
        const params = new URLSearchParams();
        params.append('member_id', memberId);
        await (0, response_error_handle_util_1.responseErrorHandle)('장바구니 초기화', this.httpService.post(url, params), { memberId });
        return true;
    }
};
exports.SelversCartClient = SelversCartClient;
exports.SelversCartClient = SelversCartClient = __decorate([
    (0, common_1.Injectable)()
], SelversCartClient);
//# sourceMappingURL=selvers-cart-client.js.map