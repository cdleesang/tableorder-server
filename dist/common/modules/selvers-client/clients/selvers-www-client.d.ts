import { HttpService } from '@nestjs/axios';
export declare abstract class SelversWWWClient {
    protected readonly httpService: HttpService;
    constructor(httpService: HttpService);
    protected genFullPath(url: string): string;
}
