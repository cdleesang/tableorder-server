import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { EasycallCallStaffResponse, EasycallSetupListResponse } from './types/easycall-selver-client-response.type';
import { EasycallOptionId, TableId } from './types/selvers-client.type';

@Injectable()
export class EasycallSelversClientService {
  private readonly BASE_URL = 'http://easycall.selfood.co.kr';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 직원 호출 옵션 조회
   */
  async getCallStaffOptions() {
    const url = `${this.BASE_URL}/api/easyCall/v2/easyCallSetupList.json`;

    const { data } = await firstValueFrom(
      this.httpService.get<EasycallSetupListResponse>(url, {
        params: {
          store_id: this.configService.get('STORE_ID'),
        },
      }).pipe(
        catchError((error: AxiosError) => {
          console.error('[직원 호출 옵션 조회] Axios Error\n', error);
          throw new Error('직원 호출 옵션 조회에 실패했습니다.');
        }),
      ),
    );

    if(data.result !== 'ok') {
      console.error('[직원 호출 옵션 조회] Response Error\n', data);
      throw new Error('직원 호출 옵션 조회에 실패했습니다.');
    }

    return data;
  }

  /**
   * 직원 호출
   */
  async callStaff(
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
    const url = `${this.BASE_URL}/api/easyCall/v2/reqEasyCall.json`;

    const params = new URLSearchParams();
    params.append('store_id', this.configService.get('STORE_ID') || '');
    params.append('store_table_id', tableId);

    options.forEach((option, index) => {
      // 요청사항 아이디, 필수 프로퍼티, 검증은 하지않음
      params.append(`easy_call_setup_ids[${index}]`, option.id);
      // 관리자쪽에서 표시되는 주문내역 이름, 필수 프로퍼티, 검증은 하지않음
      params.append(`item_names[${index}]`, option.title);
      // 요청 개수, 기본값 있음, 검증은 하지않음
      params.append(`req_cnt[${index}]`, option.count.toString());
    });

    const { data } = await firstValueFrom(
      this.httpService.post<EasycallCallStaffResponse>(url, params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      })
        .pipe(catchError((error: AxiosError) => {
          console.error(
            '[직원 호출] Axios Error\n',
            `tableId: ${tableId}\n`,
            `options: ${JSON.stringify(options)}\n`,
            error,
          );
          throw new Error('직원 호출에 실패했습니다.');
        })),
    );

    if(data.result !== 'ok') {
      console.error(
        '[직원 호출] Response Error\n',
        `tableId: ${tableId}\n`,
        `options: ${JSON.stringify(options)}\n`,
        data,
      );
      throw new Error('직원 호출에 실패했습니다.');
    }

    return true;
  }
}