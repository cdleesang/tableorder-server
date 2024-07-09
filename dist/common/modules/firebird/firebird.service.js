"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebirdService = void 0;
const common_1 = require("@nestjs/common");
const Firebird = require("@oz-k/node-firebird-cp949");
const option_inject_key_constant_1 = require("./constants/option-inject-key.constant");
let FirebirdService = class FirebirdService {
    options;
    pool;
    constructor(options) {
        this.options = options;
    }
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
    async findFirst(table, options) {
        return (await this.findMany(table, {
            ...options,
            limit: 1,
        }))?.[0];
    }
    async findMany(table, options) {
        return this.timeout(this.getConnection(db => {
            return new Promise((resolve, reject) => {
                const { select, where, offset, limit, orderBy } = options;
                const selectFields = select ? Object.keys(select).join(', ') : '*';
                const whereFields = where ? Object.keys(where).map(key => {
                    const { type, value } = where[key];
                    let operator;
                    if (value === null) {
                        if (type === 'eq')
                            return `${key} IS NULL`;
                        if (type === 'ne')
                            return `${key} IS NOT NULL`;
                        throw new Error('Invalid where condition');
                    }
                    else {
                        switch (type) {
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
                    ? orderBy.map(({ column, order }) => `${column} ${order}`).join(', ')
                    : '';
                const query = `SELECT ${selectFields} `
                    + `FROM ${table}`
                    + `${whereFields ? ` WHERE ${whereFields}` : ''}`
                    + `${orderFields ? ` ORDER BY ${orderFields}` : ''}`
                    + `${limit ? ` ROWS ${limit}` : ''}`
                    + `${offset ? ` TO ${offset}` : ''}`;
                db.query(query, where ? Object.values(where).map(({ value }) => value) : [], (err, result) => {
                    if (err)
                        return reject(err);
                    if (!result)
                        return reject(new Error('Record not found'));
                    return resolve(result);
                });
            });
        }), 10000, 'Database query timeout');
    }
    rawQuery(query, params = []) {
        return this.timeout(this.getConnection(db => {
            return new Promise((resolve, reject) => {
                db.query(query, params, (err, result) => {
                    if (err)
                        return reject(err);
                    return resolve(result);
                });
            });
        }), 10000, 'Database query timeout');
    }
    async onModuleDestroy() {
        if (this.pool) {
            this.pool.destroy();
        }
    }
    getConnection(callback) {
        return new Promise((resolve, reject) => {
            this.pool.get((err, db) => {
                if (err)
                    return reject(err);
                return callback(db).then(result => {
                    db.detach();
                    resolve(result);
                }).catch(reject);
            });
        });
    }
    timeout(promise, ms, message) {
        return Promise.race([
            promise,
            new Promise((_, reject) => { setTimeout(() => reject(new Error(message ?? 'Promise timeout')), ms); }),
        ]);
    }
};
exports.FirebirdService = FirebirdService;
exports.FirebirdService = FirebirdService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(option_inject_key_constant_1.OPTION_INJECT_KEY)),
    __metadata("design:paramtypes", [Object])
], FirebirdService);
//# sourceMappingURL=firebird.service.js.map