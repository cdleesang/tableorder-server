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
exports.ViewAllOrderHistoriesService = void 0;
const common_1 = require("@nestjs/common");
const admin_permission_denied_error_1 = require("../../../auth/domain/errors/admin-permission-denied-error");
const admin_permission_1 = require("../../../auth/domain/models/admin-permission");
const services_1 = require("../../../auth/domain/services");
const order_history_repository_1 = require("../../ports/out/order-history-repository");
let ViewAllOrderHistoriesService = class ViewAllOrderHistoriesService {
    tableOrderHistoryRepository;
    canAdminAccessService;
    constructor(tableOrderHistoryRepository, canAdminAccessService) {
        this.tableOrderHistoryRepository = tableOrderHistoryRepository;
        this.canAdminAccessService = canAdminAccessService;
    }
    async execute(authority) {
        const isAccessible = await this.canAdminAccessService.execute(authority, admin_permission_1.AdminPermission.VIEW_ORDER);
        if (!isAccessible) {
            throw new admin_permission_denied_error_1.AdminPermissionDeniedError();
        }
        return this.tableOrderHistoryRepository.findAll();
    }
};
exports.ViewAllOrderHistoriesService = ViewAllOrderHistoriesService;
exports.ViewAllOrderHistoriesService = ViewAllOrderHistoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(order_history_repository_1.TableOrderHistoryRepository)),
    __metadata("design:paramtypes", [Object, services_1.CanAdminAccessService])
], ViewAllOrderHistoriesService);
//# sourceMappingURL=view-all-order-histories.service.js.map