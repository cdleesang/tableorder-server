import { getTransform } from './decorators/transform.decorator';
import { FirebirdService } from './firebird.service';
import { getColumnName } from './decorators/column.decorator';

export abstract class BasePosRepository<T extends Record<string, any>> {
  constructor(
    private readonly tableName: string,
    private readonly entity: (new () => T),
    private readonly firebirdService: FirebirdService,
  ) {}

  async findFirst<S extends keyof T>(
    options: {
      select?: Record<S, true>,
      where?: Partial<{
        [K in keyof T]: {
          type: 'eq' | 'ne' | 'gte' | 'gt' | 'lt' | 'lte';
          value: T[K] | null;
        }
      }>,
      orderBy?: Record<keyof T, 'asc' | 'desc'>,
    },
  ): Promise<{
    [key in S]: T[key];
  } | undefined> {
    const newOptions = this.parseFindOptions(options);

    const data = await this.firebirdService.findFirst(
      this.tableName,
      newOptions,
    );

    return (data ? this.parse(data) : undefined) as unknown as Promise<{
      [key in S]: T[key];
    } | undefined>;
  }

  async findMany<S extends keyof T>(
    options: {
      select?: Partial<Record<S, true>>,
      where?: Partial<{
        [K in keyof T]: {
          type: 'eq' | 'ne' | 'gte' | 'gt' | 'lt' | 'lte';
          value: T[K] | null;
        }
      }>,
      orderBy?: {column: keyof T, order: 'asc' | 'desc'}[],
      offset?: number,
      limit?: number,
    },
  ): Promise<{
    [key in S]: T[key];
  }[]> {
    const newOptions = this.parseFindOptions(options);
    newOptions.offset = options.offset;
    newOptions.limit = options.limit;

    const data = await this.firebirdService.findMany(
      this.tableName,
      newOptions,
    );

    return data.map((item: Record<string, any>) => this.parse(item)) as unknown as Promise<{
      [key in S]: T[key];
    }[]>;
  }

  rawQuery(query: string, params: string[] = []): Promise<Record<string, any>[]> {
    return this.firebirdService.rawQuery(query, params);
  }

  private parseFindOptions(options: Record<string, any>): Record<string, any> {
    const entity = new this.entity();
    const newOptions: Record<string, any> = {};

    if(options.select) {
      newOptions.select = {};
      Object.keys(options.select).forEach(key => {
        const columnName = getColumnName(entity, key);

        (newOptions.select as Record<string, true>)[columnName !== undefined ? columnName : key] = true;
      });
    }

    if(options.where) {
      newOptions.where = {};
      Object.keys(options.where).forEach(key => {
        const columnName = getColumnName(entity, key);

        (newOptions.where as Record<string, any>)[columnName !== undefined ? columnName : key] = options.where[key];
      });
    }

    if(options.orderBy) {
      newOptions.orderBy = options.orderBy.map(({column, order}) => ({
        column: getColumnName(entity, column),
        order,
      }));
    }

    return newOptions;
  }

  private parse(data: Record<string, any>): T {
    const entity = new this.entity();

    Object.keys(entity).forEach((key: keyof T) => {
      const columnName = getColumnName(entity, key as string);
      const transform = getTransform(entity, key as string);

      if(columnName && columnName in data) {
        entity[key] = transform ? transform(data[columnName]) : data[columnName];
      } else if(key in data) {
        entity[key] = transform ? transform(data[key as string]) : data[key as string];
      }
    });

    return entity;
  }
}