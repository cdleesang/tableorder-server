import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LegacyPrismaService } from '../../common/modules/prisma';
import { SelversClientService } from '../../common/modules/selvers-client';
import { ConfigService } from '../../config';
import { GetAllCartItemsDto } from './dto';

@Injectable()
export class CartService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: LegacyPrismaService,
    private readonly selversClientService: SelversClientService,
  ) {}

  async getAllCartItems(tableId: number): Promise<GetAllCartItemsDto.Response> {
    const memberId = await this.prismaService.getMemberIdByTableId(tableId);

    const data = await this.selversClientService.cart.getManyCartItem(memberId, 1);

    return {
      cartItems: data.list.map(({Cart: item}) => ({
        id: parseInt(item.id, 10),
        menuId: parseInt(item.Food.id, 10),
        menuName: item.Food.food_name,
        menuAmount: parseInt(item.amount, 10) || 1,
        menuTotalPrice: parseInt(item.price, 10) || 0,
        imageUrl: item.Food.image_uri,
        menuMainOption: {
          id: parseInt(item.CartFood.food_price_opt_id, 10),
          name: item.FoodPriceOpt.opt_name || '',
          price: parseInt(item.FoodPriceOpt.opt_price, 10) || 0,
        },
        menuSubOptions: item.FoodOpt.reduce<GetAllCartItemsDto.CartItem['menuSubOptions']>((prev, next) => {
          return Array.isArray(next)
            ? prev
            : [
              ...prev,
              {
                groupId: parseInt(next.id, 10),
                groupName: next.food_opt_name,
                optionId: parseInt(next.FoodOptItem.id, 10),
                optionName: next.FoodOptItem.food_opt_item_name,
                optionPrice: parseInt(next.FoodOptItem.food_opt_item_price, 10),
              },
            ];
        }, []),
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
  ): Promise<number> {
    const storeId = this.configService.get('STORE_ID');
    const memberId = await this.prismaService.getMemberIdByTableId(tableId);

    const { count } = await this.selversClientService.cart.getCartItemCount(memberId);

    if(count >= 10) {
      throw new ConflictException('장바구니에 더 이상 상품을 추가할 수 없습니다.');
    }
    
    await this.selversClientService.cart.addItem(
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

    const { cartItems } = await this.getAllCartItems(tableId);

    const addedItem = cartItems.findLast(item => {
      return item.menuId === menu.id
        && item.menuAmount === menu.amount
        && item.menuTotalPrice === menu.totalPrice
        && item.menuMainOption.id === menu.mainOptionId
        && item.menuSubOptions.length === menu.subOptions.length
        && item.menuSubOptions.every(
          subOption => menu.subOptions.find(
            option => (option.optionGroupId === subOption.groupId)
              && (option.optionId === subOption.optionId),
          ),
        );
    });

    if(!addedItem) {
      throw new InternalServerErrorException('상품 추가에 실패했습니다.');
    }

    return addedItem.id;
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