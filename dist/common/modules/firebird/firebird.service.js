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
    db;
    constructor(options) {
        this.options = options;
    }
    async onModuleInit() {
        await this.connect();
    }
    async connect() {
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
                    if (err)
                        return reject(err);
                    if (!db)
                        return reject(new Error('Database connection failed'));
                    return resolve(db);
                });
            });
        })();
    }
    async findFirst(table, options) {
        return (await this.findMany(table, {
            ...options,
            limit: 1,
        }))?.[0];
    }
    async findMany(table, options) {
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
            this.db.query(query, where ? Object.values(where).map(({ value }) => value) : [], (err, result) => {
                if (err)
                    return reject(err);
                if (!result)
                    return reject(new Error('Record not found'));
                return resolve(result);
            });
        });
    }
    async rawQuery(query, params = []) {
        return new Promise((resolve, reject) => {
            try {
                this.db.query(query, params, (err, result) => {
                    if (err) {
                        console.log('Firebird Raw Query Error', err);
                        return reject(err);
                    }
                    return resolve(result);
                });
            }
            catch (error) {
                console.log('Firebird Raw Query Exception', error);
                throw new Error('Database query failed');
            }
        });
    }
    async onModuleDestroy() {
        if (this.db) {
            this.db.detach();
        }
    }
};
exports.FirebirdService = FirebirdService;
exports.FirebirdService = FirebirdService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(option_inject_key_constant_1.OPTION_INJECT_KEY)),
    __metadata("design:paramtypes", [Object])
], FirebirdService);
//# sourceMappingURL=firebird.service.js.map