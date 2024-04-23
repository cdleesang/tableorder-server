import { ForbiddenException, Injectable } from '@nestjs/common';
import typia from 'typia';
import { ConfigService } from '../../config/config.service';
import { SelversClientService } from '../../providers/selvers-client/selvers-client.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { OrderImmediatelyBody } from './types/order-request.type';
import { GetAllOrderHistoriesResponse, GetOrderHistoriesByTableId } from './types/order-response.type';
import { PosHTableRepository } from '../../providers/pos-repository/pos-h-table.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly selversClientService: SelversClientService,
    private readonly cartService: CartService,
    private readonly posHTableRepository: PosHTableRepository,
  ) {}

  async getAllOrderHistories(tableId: number, enteredAt: string & typia.tags.Format<'date-time'>): Promise<GetAllOrderHistoriesResponse> {
    const storeId = this.configService.get('STORE_ID');
    const result = await this.prismaService.table.findUnique({
      select: {storeTableId: true},
      where: {id: tableId},
    });

    const orderHistories = await this.selversClientService.order.getOrderHistory(storeId, result!.storeTableId!, new Date(enteredAt));

    return {
      orderHistories: orderHistories.list.map(order => ({
        id: parseInt(order.Order.id, 10),
        totalPrice: parseInt(order.Order.total_price, 10),
        createdAt: new Date(`${order.Order.created}Z+09:00`),
        orderSeq: parseInt(order.Order.order_seq, 10),
        menus: order.Order.OrderFoods.map(({OrderFood, OrderFoodOpt}) => ({
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

  async getOrderHistoriesByTableId(loggedInTableId: number, tableId: number): Promise<GetOrderHistoriesByTableId> {
    if(loggedInTableId !== tableId) {
      throw new ForbiddenException('이 테이블의 주문내역을 조회할 권한이 없습니다.');
    }

    return {
      orderHistories: await this.posHTableRepository.findMany({
        select: {
          stockName: true,
          amount: true,
          quantity: true,
          orderTime: true,
        },
        where: {tableNo: tableId},
        orderBy: {
          orderTime: 'desc',
        },
      }),
    };
  }

  async orderImmediately(tableId: number, body: OrderImmediatelyBody): Promise<true> {
    // 즉시주문을 위한 임시 테이블 아이디
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

  async order(
    tableId: number,
    cartItems: {
      id: number,
      amount: number,
      price: number,
    }[],
  ): Promise<true> {
    const storeId = this.configService.get('STORE_ID');
    const result = await this.prismaService.table.findUnique({
      select: {
        storeTableId: true,
        memberId: true,
      },
      where: {id: tableId},
    });

    const data = await this.selversClientService.order.createOrderSheet(
      storeId,
      result!.storeTableId!,
      result!.memberId!,
      cartItems.reduce((acc, item) => acc+item.price, 0).toString(),
      cartItems.map(item => ({
        id: item.id.toString(),
        amount: item.amount.toString(),
        price: item.price.toString(),
      })),
    );

    await this.selversClientService.order.order(
      storeId,
      result!.memberId!,
      data.order_id,
      cartItems.map(item => item.id.toString()),
    );

    return true;
  }
}