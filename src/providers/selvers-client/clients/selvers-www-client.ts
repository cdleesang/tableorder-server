import { HttpService } from '@nestjs/axios';

export abstract class SelversWWWClient {
  constructor(protected readonly httpService: HttpService) {}

  protected genFullPath(url: string) {
    return `http://www.selfood.co.kr${url}`;
  }
}