import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as Firebird from '@oz-k/node-firebird-cp949';
import { OPTION_INJECT_KEY } from './constants/option-inject-key.constant';
import type { FireBirdOptions } from './types/fire-bird-options.type';

@Injectable()
export class FirebirdService implements OnModuleInit, OnModuleDestroy {
  private db: Firebird.Database;

  constructor(
    @Inject(OPTION_INJECT_KEY) private readonly options: FireBirdOptions,
  ) {}

  async onModuleInit() {
    this.db = await (async () => {
      const TIMEOUT = 5000;

      const timeout = setTimeout(() => {
        throw new Error('Database connection timeout');
      }, TIMEOUT);

      return new Promise((resolve, reject) => {
        Firebird.attach({
          host: this.options.host,
          port: this.options.port,
          database: this.options.database,
          user: this.options.user,
          password: this.options.password,
          encoding: 'NONE',
        }, (err, db) => {
          clearTimeout(timeout);

          if(err) return reject(err);

          if(!db) return reject(new Error('Database connection failed'));

          return resolve(db);
        });
      });
    })();
  }

  async findFirst(
    table: string,
    options: {
      select?: Record<string, true>,
      where?: Record<string, {type: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte', value: string | number | null}>,
      orderBy?: {column: string, order: 'asc' | 'desc'}[],
    },
  ): Promise<Record<string, any> | undefined> {
    return (await this.findMany(table, {
      ...options,
      limit: 1,
    }))?.[0];
  }

  async findMany(
    table: string,
    options: {
      select?: Record<string, true>,
      where?: Record<string, {type: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte', value: string | number | null}>
      offset?: number;
      limit?: number;
      orderBy?: {column: string, order: 'asc' | 'desc'}[]
    },
  ): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      const { select, where, offset, limit, orderBy } = options;
      const selectFields = select ? Object.keys(select).join(', ') : '*';
      const whereFields = where ? Object.keys(where).map(key => {
        const { type, value } = where[key];
        let operator: string;
        
        if(value === null) {
          if(type === 'eq') return `${key} IS NULL`;
          if(type === 'ne') return `${key} IS NOT NULL`;
          throw new Error('Invalid where condition');
        } else {
          switch(type) {
            case 'eq':
              operator = '=';
              break;
            case 'ne':
              operator = '<>';
              break;
            case 'gt':
              operator = '>';
              break;
            case 'gte':
              operator = '>=';
              break;
            case 'lt':
              operator = '<';
              break;
            case 'lte':
              operator = '<=';
              break;
            default:
              throw new Error('Invalid where condition');
          }
        }

        return `${key} ${operator} ?`;
      }).join(' AND ') : '';
      const orderFields = orderBy
        ? orderBy.map(({column, order}) => `${column} ${order}`).join(', ')
        : '';
      const query = `SELECT ${selectFields} `
        + `FROM ${table}`
        + `${whereFields ? ` WHERE ${whereFields}` : ''}`
        + `${orderFields ? ` ORDER BY ${orderFields}` : ''}`
        + `${limit ? ` ROWS ${limit}` : ''}`
        + `${offset ? ` TO ${offset}` : ''}`;

      this.db.query(
        query,
        where ? Object.values(where).map(({value}) => value) : [],
        (err, result) => {
          if(err) return reject(err);

          if(!result) return reject(new Error('Record not found'));

          return resolve(result);
        },
      );
    });
  }

  async rawQuery(query: string, params: any[] = []): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      this.db.query(
        query,
        params,
        (err, result) => {
          if(err) return reject(err);

          return resolve(result);
        },
      );
    });
  }

  async onModuleDestroy() {
    if(this.db) {
      this.db.detach();
    }
  }
}