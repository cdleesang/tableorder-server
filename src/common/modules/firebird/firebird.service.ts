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
    // this.db = await (async () => {
    //   const TIMEOUT = 5000;

    //   const timeout = setTimeout(() => {
    //     throw new Error('Database connection timeout');
    //   }, TIMEOUT);

    //   return new Promise((resolve, reject) => {
    //     Firebird.attach({
    //       host: this.options.host,
    //       port: this.options.port,
    //       database: this.options.database,
    //       user: this.options.user,
    //       password: this.options.password,
    //       encoding: 'NONE',
    //     }, (err, db) => {
    //       clearTimeout(timeout);

    //       if(err) return reject(err);

    //       if(!db) return reject(new Error('Database connection failed'));

    //       return resolve(db);
    //     });
    //   });
    // })();
  }

  async findFirst(
    table: string,
    options: {
      select?: Record<string, true>,
      where?: Record<string, any>,
      orderBy?: Record<string, 'asc' | 'desc'>,
    },
  ): Promise<Record<string, any> | undefined> {
    return (await this.findMany(table, {
      ...options,
      limit: 1,
    }))[0];
  }

  async findMany(
    table: string,
    options: {
      select?: Record<string, true>,
      where?: Record<string, any>
      offset?: number;
      limit?: number;
      orderBy?: Record<string, 'asc' | 'desc'>,
    },
  ): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      const { select, where, offset, limit, orderBy } = options;
      const selectFields = select ? Object.keys(select).join(', ') : '*';
      const whereFields = where ? Object.keys(where).map(key => `${key} = ?`).join(' AND ') : '';
      const orderFields = orderBy ? Object.keys(orderBy).map(key => `${key} ${orderBy[key]}`).join(', ') : '';
      const query = `SELECT ${selectFields} `
        + `FROM ${table}`
        + `${whereFields ? ` WHERE ${whereFields}` : ''}`
        + `${orderFields ? ` ORDER BY ${orderFields}` : ''}`
        + `${limit ? ` ROWS ${limit}` : ''}`
        + `${offset ? ` TO ${offset}` : ''}`;

      this.db.query(
        query,
        where ? Object.values(where) : [],
        (err, result) => {
          if(err) return reject(err);

          if(!result) return reject(new Error('Record not found'));

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