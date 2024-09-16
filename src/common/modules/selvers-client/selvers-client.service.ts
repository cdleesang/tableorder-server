import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SelversAuthClient, SelversCartClient, SelversEasycallClient, SelversFoodClient, SelversOrderClient, SelversStoreClient } from './clients';

@Injectable()
export class SelversClientService {
  public auth: SelversAuthClient;
  public cart: SelversCartClient;
  public easycall: SelversEasycallClient;
  public food: SelversFoodClient;
  public store: SelversStoreClient;
  public order: SelversOrderClient;

  constructor(
    readonly httpService: HttpService,
  ) {
    this.auth = new SelversAuthClient(httpService);
    this.cart = new SelversCartClient(httpService);
    this.easycall = new SelversEasycallClient(httpService);
    this.food = new SelversFoodClient(httpService);
    this.store = new SelversStoreClient(httpService);
    this.order = new SelversOrderClient(httpService);
  }
}