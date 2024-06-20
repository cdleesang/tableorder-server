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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebirdService = void 0;
const common_1 = require("@nestjs/common");
const Firebird = require("@oz-k/node-firebird-cp949");
const config_service_1 = require("../../config/config.service");
let FirebirdService = class FirebirdService {
    configService;
    db;
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        this.db = await (async () => {
            const TIMEOUT = 5000;
            const timeout = setTimeout(() => {
                throw new Error('Database connection timeout');
            }, TIMEOUT);
            return new Promise((resolve, reject) => {
                Firebird.attach({
                    host: this.configService.get('POS_DATABASE_HOST'),
                    port: this.configService.get('POS_DATABASE_PORT'),
                    database: this.configService.get('POS_DATABASE_FILE_PATH'),
                    user: this.configService.get('POS_DATABASE_USER'),
                    password: this.configService.get('POS_DATABASE_PASSWORD'),
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
        }))[0];
    }
    async findMany(table, options) {
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
            this.db.query(query, where ? Object.values(where) : [], (err, result) => {
                if (err)
                    return reject(err);
                if (!result)
                    return reject(new Error('Record not found'));
                return resolve(result);
            });
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
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], FirebirdService);
//# sourceMappingURL=firebird.service.js.map