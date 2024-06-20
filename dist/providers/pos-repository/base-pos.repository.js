"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePosRepository = void 0;
const transform_decorator_1 = require("../../common/decorators/transform.decorator");
const column_decorator_1 = require("./decorators/column.decorator");
class BasePosRepository {
    tableName;
    entity;
    firebirdService;
    constructor(tableName, entity, firebirdService) {
        this.tableName = tableName;
        this.entity = entity;
        this.firebirdService = firebirdService;
    }
    async findFirst(options) {
        const newOptions = this.parseFindOptions(options);
        const data = await this.firebirdService.findFirst(this.tableName, newOptions);
        return (data ? this.parse(data) : undefined);
    }
    async findMany(options) {
        const newOptions = this.parseFindOptions(options);
        newOptions.offset = options.offset;
        newOptions.limit = options.limit;
        const data = await this.firebirdService.findMany(this.tableName, newOptions);
        return data.map((item) => this.parse(item));
    }
    parseFindOptions(options) {
        const entity = new this.entity();
        const newOptions = {};
        if (options.select) {
            newOptions.select = {};
            Object.keys(options.select).forEach(key => {
                const columnName = (0, column_decorator_1.getColumnName)(entity, key);
                newOptions.select[columnName !== undefined ? columnName : key] = true;
            });
        }
        if (options.where) {
            newOptions.where = {};
            Object.keys(options.where).forEach(key => {
                const columnName = (0, column_decorator_1.getColumnName)(entity, key);
                newOptions.where[columnName !== undefined ? columnName : key] = options.where[key];
            });
        }
        if (options.orderBy) {
            newOptions.orderBy = {};
            Object.keys(options.orderBy).forEach(key => {
                const columnName = (0, column_decorator_1.getColumnName)(entity, key);
                newOptions.orderBy[columnName !== undefined ? columnName : key] = options.orderBy[key];
            });
        }
        return newOptions;
    }
    parse(data) {
        const entity = new this.entity();
        Object.keys(entity).forEach((key) => {
            const columnName = (0, column_decorator_1.getColumnName)(entity, key);
            const transform = (0, transform_decorator_1.getTransform)(entity, key);
            if (columnName && columnName in data) {
                entity[key] = transform ? transform(data[columnName]) : data[columnName];
            }
            else if (key in data) {
                entity[key] = transform ? transform(data[key]) : data[key];
            }
        });
        return entity;
    }
}
exports.BasePosRepository = BasePosRepository;
//# sourceMappingURL=base-pos.repository.js.map