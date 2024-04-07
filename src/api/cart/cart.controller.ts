import { Controller, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { GetPaginatedCartItems } from './types/cart-response.type';
import { AddCartItemBody, GetPaginatedCartItemsQuery } from './types/cart-request.type';
import { TableIdGuard } from '../auth/table-id.guard';
import { TableId } from '../auth/decorators/table-id.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * 페이징된 장바구니 조회.
   * 
   * @tag 장바구니
   * @security tid
   */
  @TypedRoute.Get()
  @UseGuards(TableIdGuard)
  async getPaginatedCartItems(@TableId() tableId: number, @TypedQuery() query: GetPaginatedCartItemsQuery): Promise<GetPaginatedCartItems> {
    return this.cartService.getPaginatedCartItems(tableId, query.page);
  }

  /**
   * 장바구니에 아이템 추가.
   * 
   * @tag 장바구니
   * @security tid
   */
  @TypedRoute.Post()
  @UseGuards(TableIdGuard)
  async addItem(@TableId() tableId: number, @TypedBody() body: AddCartItemBody): Promise<true> {
    return this.cartService.addItem(tableId, {
      ...body,
      id: body.menuId,
      mainOptionId: body.menuMainOptionId,
      subOptions: body.menuSubOptions,
    });
  }

  /**
   * 아이디로 장바구니에 아이템 삭제.
   * 
   * @tag 장바구니
   * @security tid
   */
  @TypedRoute.Delete(':itemId')
  @UseGuards(TableIdGuard)
  async deleteItemById(@TableId() tableId: number, @TypedParam('itemId') itemId: number): Promise<true> {
    return this.cartService.deleteItemById(tableId, itemId);
  }

  /**
   * 장바구니 초기화.
   * 
   * @tag 장바구니
   * @security tid
   */
  @TypedRoute.Delete()
  @UseGuards(TableIdGuard)
  async clearCart(@TableId() tableId: number): Promise<true> {
    return this.cartService.clearCart(tableId);
  }
}