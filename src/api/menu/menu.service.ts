import { Injectable } from '@nestjs/common';
import { WWWSelversClientService } from '../../providers/selvers-client/www-selvers-client.service';
import { ConfigService } from '../../config/config.service';
import { GetMenuCategoriesResponse, GetMenuDetailById, GetPaginatedMenusByCategory } from './types/menu-response.type';

@Injectable()
export class MenuService {
  constructor(
    private readonly configService: ConfigService,
    private readonly wwwSelversClientService: WWWSelversClientService,
  ) {}

  async getMenuCategories(): Promise<GetMenuCategoriesResponse> {
    const storeId = this.configService.get('STORE_ID');
    const storeMemberId = this.configService.get('STORE_MEMBER_ID');

    const data = await this.wwwSelversClientService.getMenuCategory(storeId, storeMemberId);
    
    return data.data.StoreFoodDivision.map(division => {
      return {
        id: parseInt(division.id, 10),
        name: division.division_name,
        subCategories: division.children.map(division2 => {
          return {
            id: parseInt(division2.id, 10),
            name: division2.division_name,
          };
        }),
      };
    });
  }

  async getPaginatedMenusByCategory(page: number, categoryId: number, subCategoryId: number): Promise<GetPaginatedMenusByCategory> {
    const storeId = this.configService.get('STORE_ID');

    const data = await this.wwwSelversClientService.getManyMenuByCategory(storeId, page, categoryId, subCategoryId);

    return {
      totalPage: parseInt(data.total_page, 10),
      menus: data.data.map(({Food: food}) => ({
        id: parseInt(food.id, 10),
        name: food.food_name,
        engName: food.en_food_name,
        price: parseInt(food.price, 10),
        imageUrl: food.image_uri,
        isSoldOut: food.sold_out_yn === 'Y',
        isDisplay: true,
      })),
    };
  }

  async getMenuDetailById(menuId: number): Promise<GetMenuDetailById> {
    const {food: {Food: data}} = await this.wwwSelversClientService.getMenuDetailById(menuId);

    return {
      id: parseInt(data.id, 10),
      name: data.food_name,
      engName: data.en_food_name,
      description: data.food_info,
      price: parseInt(data.price, 10),
      imageUrl: data.image_uri,
      isDisplay: data.approval_yn === 'Y',
      isSoldOut: data.sold_out_yn === 'Y',
      mainOptions: data.FoodPriceOpt.map(({FoodPriceOpt: option}) => ({
        id: parseInt(option.id, 10),
        name: option.opt_name,
        price: parseInt(option.opt_price, 10),
      })),
      subOptionGroups: data.FoodOpt.map(group => ({
        id: parseInt(group.id, 10),
        name: group.food_opt_name,
        isRequired: group.essential_yn === 'Y',
        ...(
          group.multi_yn === 'Y' && {
            multiSelectOptions: {
              min: parseInt(group.min_count, 10),
              max: parseInt(group.max_count, 10),
            },
          }
        ),
        subOptions: group.FoodOptItem.map(item => ({
          id: parseInt(item.id, 10),
          name: item.food_opt_item_name,
          price: parseInt(item.food_opt_item_price, 10),
          isSoldOut: item.sold_out_yn === 'Y',
        })),
      })),
    };
  }
}