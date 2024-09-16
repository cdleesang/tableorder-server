import { TypedBody, TypedException, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, ForbiddenException, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { TableId, TableIdGuard } from '../auth';
import { OrderService } from './order.service';
import { GetAllOrderHistoriesDto, GetOrderHistoriesByTableIdDto, OrderCartDto, OrderImmediatelyDto } from './dto';

@Controller({path: 'order', version: VERSION_NEUTRAL})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * 주문내역 조회.
   * 
   * @tag 주문
   * @security tid
   * @deprecated
   */
  @TypedRoute.Get()
  @UseGuards(TableIdGuard)
  async getAllOrderHistories(@TableId() tableId: number, @TypedQuery() query: GetAllOrderHistoriesDto.Request): Promise<GetAllOrderHistoriesDto.Response> {
    return this.orderService.getAllOrderHistories(tableId, query.enteredAt);
  }

  // TODO: 모든 테이블 주문내역 조회 추가(관리자 전용)

  /**
   * 테이블 번호로 주문내역 조회.
   * 
   * @tag 주문
   * @security tid
   */
  @TypedRoute.Get(':tableId')
  @TypedException<ForbiddenException>(403, '요청한 테이블 번호와 로그인한 테이블 번호가 일치하지 않음')
  @UseGuards(TableIdGuard)
  async getOrderHistoriesByTableId(@TableId() loggedInTableId: number, @TypedParam('tableId') tableId: number): Promise<GetOrderHistoriesByTableIdDto.Response> {
    return this.orderService.getOrderHistoriesByTableId(loggedInTableId, tableId);
  }

  /**
   * 상품 즉시 주문.
   * 
   * @tag 주문
   * @security tid
   */
  @TypedRoute.Post()
  @UseGuards(TableIdGuard)
  async orderImmediately(@TableId() tableId: number, @TypedBody() body: OrderImmediatelyDto.Request) {
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
  async orderCart(@TableId() tableId: number, @TypedBody() body: OrderCartDto.Request) {
    return this.orderService.order(tableId, body.cartItems);
  }
}