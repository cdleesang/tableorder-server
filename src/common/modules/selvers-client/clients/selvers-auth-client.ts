import { TableLoginResponse } from '../types';
import { responseErrorHandle } from '../utils';
import { SelversWWWClient } from './selvers-www-client';

export class SelversAuthClient extends SelversWWWClient {
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
}