import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WWWSelversClientService {
  constructor(
    private readonly httpService: HttpService,
  ) {
    httpService.axiosRef.defaults.baseURL = 'http://www.selfood.co.kr';
  }

  
}