import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { StoreId } from './types/selvers-client.type';
import { ManyMenuResponse, MenuCategoryResponse, MenuDetailResponse, TableLoginResponse } from './types/www-selvers-client.type';
import { responseErrorHandle } from './utils/response-error-handle.util';

@Injectable()
export class WWWSelversClientService {
  constructor(private readonly httpService: HttpService) {}

  private genFullPath(url: string) {
    return `http://www.selfood.co.kr${url}`;
  }

  /**
   * 셀버스 멤버 로그인
   * 
   * @param userId 셀버스 멤버 아이디
   * @param userPw 셀버스 멤버 비밀번호
   */
  async tableLogin(userId: string, userPw: string) {
    const url = this.genFullPath('/login/table_index.json');

    const params = new URLSearchParams();
    params.append('user_id', userId);
    params.append('user_pwd', userPw);

    return await responseErrorHandle(
      '테이블 로그인',
      this.httpService.post<TableLoginResponse>(url, params),
      {
        user_id: userId,
        user_pwd: userPw,
      },
    );
  }

  /**
   * 메뉴의 2단계 카테고리 조회
   */
  async getMenuCategory(storeId: StoreId, storeMemberId: string) {
    const url = this.genFullPath('/api/tableOrder/v2/getStoreInfo2Depth.json');

    return await responseErrorHandle(
      '메뉴 카테고리 조회',
      this.httpService.get<MenuCategoryResponse>(url, {
        params: {
          member_id: storeMemberId,
          store_id: storeId,
        },
      }),
    );
  }

  /**
   * 카테고리로 메뉴 조회
   */
  async getManyMenuByCategory(storeId: StoreId, page: number, category1Depth: number, category2Depth: number) {
    const url = this.genFullPath('/api/spot/v2/getStoreProducts2Depth.json');

    const data = await responseErrorHandle(
      '메뉴 조회',
      this.httpService.get<ManyMenuResponse>(url, {
        params: {
          member_id: '',
          store_id: storeId,
          store_food_division_id: category1Depth,
          store_food_division_2depth_id: category2Depth,
          page,
        },
      }),
      {
        store_food_division_id: category1Depth,
        store_food_division_2depth_id: category2Depth,
        page,
      },
    );

    return {
      ...data,
      data: data.data.map(({Food: food}) => ({
        Food: {
          ...food,
          image_uri: this.genFullPath(food.image_uri),
        },
      })),
    };
  }

  /**
   * 메뉴 id로 메뉴 상세정보 조회
   */
  async getMenuDetailById(menuId: number) {
    const url = this.genFullPath('/custom/food_detail.json');

    const params = new URLSearchParams();
    params.append('food_id', menuId.toString());

    const data = await responseErrorHandle(
      '메뉴 상세정보 조회',
      this.httpService.post<MenuDetailResponse>(url, params),
      {menu_id: menuId},
    );

    data.food.Food.image_uri = this.genFullPath(data.food.Food.image_uri);

    return data;
  }
}