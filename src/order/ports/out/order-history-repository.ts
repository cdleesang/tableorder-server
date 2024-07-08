import { OrderHistory } from 'src/order/domain/models/order-history';

export interface TableOrderHistoryRepository {
  findAll(): Promise<OrderHistory[]>;
  findByTableId(tableId: string): Promise<OrderHistory | null>;
  totalSalesRevenue(): Promise<number>;
}

export const TableOrderHistoryRepository = Symbol('TableOrderHistoryRepository');