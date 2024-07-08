import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as Firebird from '@oz-k/node-firebird-cp949';
import { OPTION_INJECT_KEY } from './constants/option-inject-key.constant';
import type { FireBirdOptions } from './types/fire-bird-options.type';

@Injectable()
export class FirebirdService implements OnModuleInit, OnModuleDestroy {
  private pool: Firebird.ConnectionPool;

  constructor(
    @Inject(OPTION_INJECT_KEY) private readonly options: FireBirdOptions,
  ) {}

  async onModuleInit() {
    this.pool = Firebird.pool(5, {
      host: this.options.host,
      port: this.options.port,
      database: this.options.database,
      user: this.options.user,
      password: this.options.password,
      encoding: 'NONE',
    });
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
    return this.timeout(
      this.getConnection(db => {
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

          db.query(
            query,
            where ? Object.values(where).map(({value}) => value) : [],
            (err, result) => {
              if(err) return reject(err);

              if(!result) return reject(new Error('Record not found'));

              return resolve(result);
            },
          );
        });
      }),
      5000,
      'Database query timeout',
    );
  }

  rawQuery(query: string, params: any[] = []): Promise<Record<string, any>[]> {
    return this.timeout(
      this.getConnection(db => {
        return new Promise((resolve, reject) => {
          db.query(
            query,
            params,
            (err, result) => {
              if(err) return reject(err);
      
              return resolve(result);
            },
          );
        });
      }),
      5000,
      'Database query timeout',
    );
  }

  async onModuleDestroy() {
    if(this.pool) {
      this.pool.destroy();
    }
  }

  private getConnection<T>(callback: (db: Firebird.Database) => Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      this.pool.get((err, db) => {
        if(err) return reject(err);

        return callback(db).then(result => {
          db.detach();
          resolve(result);
        }).catch(reject);
      });
    });
  }

  private timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => { setTimeout(() => reject(new Error(message ?? 'Promise timeout')), ms) }),
    ]);
  }
}