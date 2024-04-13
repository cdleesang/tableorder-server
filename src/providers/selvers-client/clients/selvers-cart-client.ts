import { Injectable } from '@nestjs/common';
import { PageNotFoundError } from '../errors/page-not-found.error';
import { responseErrorHandle } from '../utils/response-error-handle.util';
import { SelversWWWClient } from './selvers-www-client';
import { BaseCartResponse, CartIndexResponse, CartItemCountResponse } from '../types/selvers-cart-response.type';

@Injectable()
export class SelversCartClient extends SelversWWWClient {
  /**
   * 장바구니 아이템 개수 조회
   */
  async getCartItemCount(memberId: string) {
    const url = this.genFullPath('/cart/total_count.json');

    const params = new URLSearchParams();
    params.append('member_id', memberId);

    return await responseErrorHandle(
      '장바구니 개수 조회',
      this.httpService.post<CartItemCountResponse>(url, params),
      {memberId},
      {
        responseHandler() {
          
        },
      },
    );
  }

  /**
   * 장바구니 조회
   */
  async getManyCartItem(memberId: string, page: number) {
    const url = this.genFullPath('/cart/index.json');

    const params = new URLSearchParams();
    params.append('member_id', memberId);
    params.append('page', page.toString());

    const data = await responseErrorHandle(
      '장바구니 조회',
      this.httpService.post<CartIndexResponse>(url, params),
      {memberId, page},
      {
        axiosHandler: err => {
          if(err.response?.status === 404) {
            throw new PageNotFoundError();
          }
        },
        responseHandler: (res, logger, error) => {
          if(res.list) return;

          logger();
          throw error;
        },
      },
    );

    return {
      ...data,
      list: data.list.map(({Cart: item}) => ({
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

  /**
   * 아이템 추가
   */
  async addItem(
    storeId: string,
    memberId: string,
    food: {
      id: string,
      amount: number,
      price: number,
      priceOptionId: string,
      options: {
        id: string,
        itemId: string,
      }[],
    },
  ): Promise<true> {
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

    await responseErrorHandle(
      '장바구니 상품 추가',
      this.httpService.post<BaseCartResponse>(url, params),
      {memberId},
    );

    return true;
  }

  /**
   * 아이템 삭제
   */
  async deleteItem(memberId: string, cartId: string): Promise<true> {
    const url = this.genFullPath('/cart/del.json');

    const params = new URLSearchParams();
    params.append('member_id', memberId);
    params.append('cart_id', cartId);

    await responseErrorHandle(
      '장바구니 상품 삭제',
      this.httpService.post<BaseCartResponse>(url, params),
      {
        memberId,
        cartId,
      },
    );

    return true;
  }

  /**
   * 장바구니 초기화
   */
  async clearCart(memberId: string): Promise<true> {
    const url = this.genFullPath('/cart/all_del.json');

    const params = new URLSearchParams();
    params.append('member_id', memberId);

    await responseErrorHandle(
      '장바구니 초기화',
      this.httpService.post(url, params),
      {memberId},
    );

    return true;
  }
}