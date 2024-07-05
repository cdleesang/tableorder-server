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
exports.SelversClientService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const selvers_auth_client_1 = require("./clients/selvers-auth-client");
const selvers_cart_client_1 = require("./clients/selvers-cart-client");
const selvers_easycall_client_1 = require("./clients/selvers-easycall-client");
const selvers_food_client_1 = require("./clients/selvers-food-client");
const selvers_store_client_1 = require("./clients/selvers-store-client");
const selvers_order_client_1 = require("./clients/selvers-order-client");
let SelversClientService = class SelversClientService {
    httpService;
    auth;
    cart;
    easycall;
    food;
    store;
    order;
    constructor(httpService) {
        this.httpService = httpService;
        this.auth = new selvers_auth_client_1.SelversAuthClient(httpService);
        this.cart = new selvers_cart_client_1.SelversCartClient(httpService);
        this.easycall = new selvers_easycall_client_1.SelversEasycallClient(httpService);
        this.food = new selvers_food_client_1.SelversFoodClient(httpService);
        this.store = new selvers_store_client_1.SelversStoreClient(httpService);
        this.order = new selvers_order_client_1.SelversOrderClient(httpService);
    }
};
exports.SelversClientService = SelversClientService;
exports.SelversClientService = SelversClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], SelversClientService);
//# sourceMappingURL=selvers-client.service.js.map