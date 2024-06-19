import { Inject, Injectable } from '@nestjs/common';
import { Table } from 'src/auth/domain/models/table';
import { TableOrderHistoryRepository } from 'src/order/ports/out/order-history-repository';

interface Response {
  totalPrice: number;
  menus: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    orderedAt: Date;
  }[];
}

@Injectable()
export class ViewOrderHistorySelfService {
  constructor(
    @Inject(TableOrderHistoryRepository) private readonly tableOrderHistoryRepository: TableOrderHistoryRepository,
  ) {}

  async execute(authority: Table): Promise<Response> {
    const history = await this.tableOrderHistoryRepository.findByTableId(authority.id);

    if(!history) {
      return {
        totalPrice: 0,
        menus: [],
      };
    }

    return history;
  }
}