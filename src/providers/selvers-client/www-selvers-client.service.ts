import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { TableLoginResponse } from './types/www-selvers-client.type';

@Injectable()
export class WWWSelversClientService {
  private readonly BASE_URL = 'http://www.selfood.co.kr';

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async tableLogin(userId: string, userPw: string) {
    const url = `${this.BASE_URL}/login/table_index.json`;

    const params = new URLSearchParams();
    params.append('user_id', userId);
    params.append('user_pwd', userPw);

    const { data } = await firstValueFrom(
      this.httpService.post<TableLoginResponse>(url, params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      })
        .pipe(catchError((error: AxiosError) => {
          console.error(
            '[테이블 로그인] Axios Error\n',
            `userId: ${userId}\n`,
            `userPw: ${userPw}\n`,
            error,
          );
          throw new Error('테이블 로그인에 실패했습니다.');
        })),
    );

    if(data.result !== 'ok') {
      console.error(
        '[테이블 로그인] Response Error\n',
        `userId: ${userId}\n`,
        `userPw: ${userPw}\n`,
        data,
      );
      throw new Error('테이블 로그인에 실패했습니다.');
    }

    return data;
  }
}