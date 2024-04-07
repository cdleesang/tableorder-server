import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SelversAuthClient } from './clients/selvers-auth-client';
import { SelversCartClient } from './clients/selvers-cart-client';
import { SelversEasycallClient } from './clients/selvers-easycall-client';
import { SelversFoodClient } from './clients/selvers-food-client';

@Injectable()
export class SelversClientService {
  public auth: SelversAuthClient;
  public cart: SelversCartClient;
  public easycall: SelversEasycallClient;
  public food: SelversFoodClient;

  constructor(
    readonly httpService: HttpService,
  ) {
    this.auth = new SelversAuthClient(httpService);
    this.cart = new SelversCartClient(httpService);
    this.easycall = new SelversEasycallClient(httpService);
    this.food = new SelversFoodClient(httpService);
  }
}