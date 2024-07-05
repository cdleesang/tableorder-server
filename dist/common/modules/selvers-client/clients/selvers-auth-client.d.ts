import { TableLoginResponse } from '../types/selvers-auth-response.type';
import { SelversWWWClient } from './selvers-www-client';
export declare class SelversAuthClient extends SelversWWWClient {
    tableLogin(userId: string, userPw: string): Promise<TableLoginResponse>;
}
