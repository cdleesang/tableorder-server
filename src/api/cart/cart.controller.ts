import { TypedBody, TypedException, TypedParam, TypedRoute } from '@nestia/core';
import { ConflictException, Controller, UseGuards } from '@nestjs/common';
import { TableId } from '../auth/decorators/table-id.decorator';
import { TableIdGuard } from '../auth/table-id.guard';
import { CartService } from './cart.service';
import { AddCartItemBody } from './types/cart-request.type';
import { GetAllCartItems } from './types/cart-response.type';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * 장바구니 조회.
   * 
   * @tag 장바구니
   * @security tid
   */
  @TypedRoute.Get()
  @UseGuards(TableIdGuard)
  async getAllCartItems(@TableId() tableId: number): Promise<GetAllCartItems> {
    return this.cartService.getAllCartItems(tableId);
  }

  /**
   * 장바구니에 아이템 추가.
   * 
   * @tag 장바구니
   * @security tid
   */
  @TypedRoute.Post()
  @TypedException<ConflictException>(409, '상품을 더이상 추가할 수 없음')
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