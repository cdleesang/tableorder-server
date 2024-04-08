import { PageNotFoundError } from '../errors/page-not-found.error';
import { SelversWWWClient } from './selvers-www-client';
import { ManyMenuResponse, MenuCategoryResponse, MenuDetailResponse, NewStoreFoodsResponse } from '../types/selvers-food-response.type';
import { StoreId } from '../types/selvers-client.type';
import { responseErrorHandle } from '../utils/response-error-handle.util';

export class SelversFoodClient extends SelversWWWClient {
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
  async getManyMenuByCategory(storeId: StoreId, page: number, category1Depth: number, category2Depth?: number) {
    const data = category2Depth
      ? await this.getManyMenuByCategory2Depth(storeId, page, category1Depth, category2Depth)
      : await this.getManyMenuByCategory1Depth(storeId, page, category1Depth);

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

  private async getManyMenuByCategory1Depth(storeId: string, page: number, category1Depth: number): Promise<ManyMenuResponse> {
    const url = this.genFullPath('/spot/new_store_foods.json');

    const data = await responseErrorHandle(
      '메뉴 조회',
      this.httpService.post<NewStoreFoodsResponse>(url, {
        store_id: storeId,
        division_id: category1Depth,
        page,
      }),
      {
        store_food_division_id: category1Depth,
        page,
      },
      {
        axiosHandler: (err) => {
          if(err.response?.status === 404) {
            throw new PageNotFoundError();
          }
        },
        responseHandler: (data, logger, error) => {
          if(data.list) return;

          if(data.message === 'Not Found') {
            throw new PageNotFoundError();
          }

          logger();
          throw error;
        }
      }
    );

    return {
      result: 'ok',
      message: 'ok',
      total_page: data.totalPage.toString(),
      data: data.list,
      page: data.page.toString(),
    };
  }

  private async getManyMenuByCategory2Depth(storeId: StoreId, page: number, category1Depth: number, category2Depth: number): Promise<ManyMenuResponse> {
    const url = this.genFullPath('/api/spot/v2/getStoreProducts2Depth.json');

    return await responseErrorHandle(
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
      {
        axiosHandler: (err) => {
          if(err.response?.status === 404) {
            throw new PageNotFoundError();
          }
        },
        responseHandler: (data, logger, error) => {
          if(data.data) return;

          if(data.message === '등록된 DATA가 없습니다.') {
            throw new PageNotFoundError();
          }

          logger();
          throw error;
        }
      }
    );
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