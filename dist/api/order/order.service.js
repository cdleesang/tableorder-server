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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../../config/config.service");
const selvers_client_service_1 = require("../../providers/selvers-client/selvers-client.service");
const prisma_service_1 = require("../../providers/prisma/prisma.service");
const cart_service_1 = require("../cart/cart.service");
const pos_h_table_repository_1 = require("../../providers/pos-repository/pos-h-table.repository");
let OrderService = class OrderService {
    configService;
    prismaService;
    selversClientService;
    cartService;
    posHTableRepository;
    constructor(configService, prismaService, selversClientService, cartService, posHTableRepository) {
        this.configService = configService;
        this.prismaService = prismaService;
        this.selversClientService = selversClientService;
        this.cartService = cartService;
        this.posHTableRepository = posHTableRepository;
    }
    async getAllOrderHistories(tableId, enteredAt) {
        const storeId = this.configService.get('STORE_ID');
        const result = await this.prismaService.table.findUnique({
            select: { storeTableId: true },
            where: { id: tableId },
        });
        const orderHistories = await this.selversClientService.order.getOrderHistory(storeId, result.storeTableId, new Date(enteredAt));
        return {
            orderHistories: orderHistories.list.map(order => ({
                id: parseInt(order.Order.id, 10),
                totalPrice: parseInt(order.Order.total_price, 10),
                createdAt: new Date(`${order.Order.created}Z+09:00`),
                orderSeq: parseInt(order.Order.order_seq, 10),
                menus: order.Order.OrderFoods.map(({ OrderFood, OrderFoodOpt }) => ({
                    id: parseInt(OrderFood.id, 10),
                    totalPrice: parseInt(OrderFood.price, 10),
                    amount: parseInt(OrderFood.amount, 10),
                    name: OrderFood.food_name,
                    mainOptionName: OrderFood.food_price_opt_name,
                    subOptionGroups: OrderFoodOpt.map(opt => ({
                        groupName: opt.food_opt_name,
                        optionName: opt.food_opt_item_name,
                        optionPrice: parseInt(opt.food_opt_item_price, 10),
                    })),
                })),
            })),
        };
    }
    async getOrderHistoriesByTableId(loggedInTableId, tableId) {
        if (loggedInTableId !== tableId) {
            throw new common_1.ForbiddenException('이 테이블의 주문내역을 조회할 권한이 없습니다.');
        }
        return {
            orderHistories: await this.posHTableRepository.findMany({
                select: {
                    stockName: true,
                    amount: true,
                    quantity: true,
                    orderTime: true,
                },
                where: { tableNo: tableId },
                orderBy: {
                    orderTime: 'desc',
                },
            }),
        };
    }
    async orderImmediately(tableId, body) {
        const temporaryTableId = tableId + 100;
        await this.cartService.addItem(temporaryTableId, {
            ...body,
            id: body.menuId,
            mainOptionId: body.menuMainOptionId,
            subOptions: body.menuSubOptions,
        });
        const { cartItems } = await this.cartService.getAllCartItems(temporaryTableId);
        return await this.order(tableId, cartItems.map(item => ({
            id: item.id,
            amount: item.menuAmount,
            price: item.menuTotalPrice,
        })));
    }
    async order(tableId, cartItems) {
        const storeId = this.configService.get('STORE_ID');
        const result = await this.prismaService.table.findUnique({
            select: {
                storeTableId: true,
                memberId: true,
            },
            where: { id: tableId },
        });
        const data = await this.selversClientService.order.createOrderSheet(storeId, result.storeTableId, result.memberId, cartItems.reduce((acc, item) => acc + item.price, 0).toString(), cartItems.map(item => ({
            id: item.id.toString(),
            amount: item.amount.toString(),
            price: item.price.toString(),
        })));
        await this.selversClientService.order.order(storeId, result.memberId, data.order_id, cartItems.map(item => item.id.toString()));
        return true;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        prisma_service_1.PrismaService,
        selvers_client_service_1.SelversClientService,
        cart_service_1.CartService,
        pos_h_table_repository_1.PosHTableRepository])
], OrderService);
//# sourceMappingURL=order.service.js.map