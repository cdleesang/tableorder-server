import { TypedBody, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { TableId } from '../auth/decorators/table-id.decorator';
import { TableIdGuard } from '../auth/table-id.guard';
import { OrderService } from './order.service';
import { GetAllOrderHistoriesQuery, OrderCartBody, OrderImmediatelyBody } from './types/order-request.type';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * 주문내역 조회.
   * 
   * @tag 주문
   * @security tid
   */
  @TypedRoute.Get()
  @UseGuards(TableIdGuard)
  async getAllOrderHistories(@TableId() tableId: number, @TypedQuery() query: GetAllOrderHistoriesQuery) {
    return this.orderService.getAllOrderHistories(tableId, query.enteredAt);
  }

  /**
   * 상품 즉시 주문.
   * 
   * @tag 주문
   * @security tid
   */
  @TypedRoute.Post()
  @UseGuards(TableIdGuard)
  async orderImmediately(@TableId() tableId: number, @TypedBody() body: OrderImmediatelyBody) {
    return this.orderService.orderImmediately(tableId, body);
  }

  /**
   * 장바구니 전체 주문.
   * 
   * @tag 주문
   * @security tid
   */
  @TypedRoute.Post('cart')
  @UseGuards(TableIdGuard)
  async orderCart(@TableId() tableId: number, @TypedBody() body: OrderCartBody) {
    return this.orderService.order(tableId, body.cartItems);
  }
}