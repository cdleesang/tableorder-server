import { getTransform } from '../../decorators/transform.decorator';
import { FirebirdService } from '../firebird/firebird.service';
import { getColumnName } from './decorators/column.decorator';

export abstract class BasePosRepository<T extends Record<string, any>> {
  constructor(
    private readonly tableName: string,
    private readonly entity: (new () => T),
    private readonly firebirdService: FirebirdService,
  ) {}

  async findFirst<K extends keyof T>(
    options: {
      select?: Record<K, true>,
      where?: Partial<T>,
      orderBy?: Record<keyof T, 'asc' | 'desc'>,
    },
  ): Promise<{
    [key in K]: T[key];
  } | undefined> {
    const newOptions = this.parseFindOptions(options);

    const data = await this.firebirdService.findFirst(
      this.tableName,
      newOptions,
    );

    return (data ? this.parse(data) : undefined) as unknown as Promise<{
      [key in K]: T[key];
    } | undefined>;
  }

  async findMany<K extends keyof T>(
    options: {
      select?: Record<K, true>,
      where?: Partial<T>,
      orderBy?: Partial<Record<keyof T, 'asc' | 'desc'>>,
      offset?: number,
      limit?: number,
    },
  ): Promise<{
    [key in K]: T[key];
  }[]> {
    const newOptions = this.parseFindOptions(options);
    newOptions.offset = options.offset;
    newOptions.limit = options.limit;

    const data = await this.firebirdService.findMany(
      this.tableName,
      newOptions,
    );

    return data.map((item: Record<string, any>) => this.parse(item)) as unknown as Promise<{
      [key in K]: T[key];
    }[]>;
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
      newOptions.orderBy = {};
      Object.keys(options.orderBy).forEach(key => {
        const columnName = getColumnName(entity, key);

        (newOptions.orderBy as Record<string, 'asc' | 'desc'>)[columnName !== undefined ? columnName : key] = options.orderBy[key];
      });
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