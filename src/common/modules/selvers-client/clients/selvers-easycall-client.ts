import { HttpService } from '@nestjs/axios';
import { EasycallCallStaffResponse, EasycallOptionId, EasycallSetupListResponse, StoreId, TableId } from '../types';
import { responseErrorHandle } from '../utils';

export class SelversEasycallClient {
  constructor(private readonly httpService: HttpService) {}

  private genFullPath(url: string) {
    return `http://easycall.selfood.co.kr${url}`;
  }

  /**
   * 직원 호출 옵션 조회
   */
  async getCallStaffOptions(storeId: StoreId) {
    const url = this.genFullPath('/api/easyCall/v2/easyCallSetupList.json');

    return await responseErrorHandle(
      '직원 호출 옵션 조회',
      this.httpService.get<EasycallSetupListResponse>(url, {
        params: {
          store_id: storeId,
        },
      }),
    );
  }

  /**
   * 직원 호출
   */
  async callStaff(
    storeId: StoreId,
    tableId: TableId,
    options: {
      /** 직원호출옵션 고유 아이디 */
      id: EasycallOptionId,
      /** 직원호출 표시명 */
      title: string,
      /** 수량 */
      count: number,
    }[],
  ): Promise<true> {
    const url = this.genFullPath('/api/easyCall/v2/reqEasyCall.json');

    const params = new URLSearchParams();
    params.append('store_id', storeId);
    params.append('store_table_id', tableId);

    options.forEach((option, index) => {
      // 요청사항 아이디, 필수 프로퍼티, 검증은 하지않음
      params.append(`easy_call_setup_ids[${index}]`, option.id);
      // 관리자쪽에서 표시되는 주문내역 이름, 필수 프로퍼티, 검증은 하지않음
      params.append(`item_names[${index}]`, option.title);
      // 요청 개수, 기본값 있음, 검증은 하지않음
      params.append(`req_cnt[${index}]`, option.count.toString());
    });

    await responseErrorHandle(
      '직원 호출',
      this.httpService.post<EasycallCallStaffResponse>(url, params),
      {
        store_table_id: tableId,
        options: JSON.stringify(options),
      },
    );

    return true;
  }
}