import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { PageNotFoundError } from '../../providers/selvers-client/errors/page-not-found.error';
import { SelversClientService } from '../../providers/selvers-client/selvers-client.service';
import { GetPaginatedCartItems } from './types/cart-response.type';

@Injectable()
export class CartService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly selversClientService: SelversClientService,
  ) {}

  async getPaginatedCartItems(tableId: number, page: number): Promise<GetPaginatedCartItems> {
    const memberId = await this.prismaService.getMemberIdByTableId(tableId);

    const data = await (async () => {
      try {
        return await this.selversClientService.cart.getManyCartItem(memberId, page);
      } catch(err) {
        if(err instanceof PageNotFoundError) {
          throw new NotFoundException('요청하신 페이지를 찾을 수 없습니다.');
        }

        throw err;
      }
    })();

    return {
      totalPage: data.totalPage,
      cartItems: data.list.map(({Cart: item}) => ({
        id: parseInt(item.id, 10),
        menuId: parseInt(item.Food.id, 10),
        menuName: item.Food.food_name,
        menuAmount: parseInt(item.amount, 10),
        menuTotalPrice: parseInt(item.price, 10),
        imageUrl: item.Food.image_uri,
        menuMainOption: {
          id: parseInt(item.CartFood.food_price_opt_id, 10),
          name: item.FoodPriceOpt.opt_name,
          price: parseInt(item.FoodPriceOpt.opt_price, 10),
        },
        menuSubOptions: item.FoodOpt.map(option => ({
          groupId: parseInt(option.id, 10),
          groupName: option.food_opt_name,
          optionId: parseInt(option.FoodOptItem.id, 10),
          optionName: option.FoodOptItem.food_opt_item_name,
          optionPrice: parseInt(option.FoodOptItem.food_opt_item_price, 10),
        })),
      })),
    };
  }

  async addItem(
    tableId: number,
    menu: {
      id: number,
      mainOptionId: number,
      amount: number,
      totalPrice: number,
      subOptions: {
        optionGroupId: number,
        optionId: number,
      }[],
    },
  ): Promise<true> {
    const storeId = this.configService.get('STORE_ID');
    const memberId = await this.prismaService.getMemberIdByTableId(tableId);

    return this.selversClientService.cart.addItem(
      storeId,
      memberId,
      {
        id: menu.id.toString(),
        amount: menu.amount,
        price: menu.totalPrice,
        priceOptionId: menu.mainOptionId.toString(),
        options: menu.subOptions.map(option => ({
          id: option.optionGroupId.toString(),
          itemId: option.optionId.toString(),
        })),
      },
    );
  }

  async deleteItemById(tableId: number, itemId: number): Promise<true> {
    const memberId = await this.prismaService.getMemberIdByTableId(tableId);

    return this.selversClientService.cart.deleteItem(memberId, itemId.toString());
  }

  async clearCart(tableId: number): Promise<true> {
    const memberId = await this.prismaService.getMemberIdByTableId(tableId);
    
    return this.selversClientService.cart.clearCart(memberId);
  }
}