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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const config_service_1 = require("../../config/config.service");
const notification_service_1 = require("../notification/notification.service");
const selvers_client_service_1 = require("../../common/modules/selvers-client/selvers-client.service");
let StoreService = class StoreService {
    configService;
    selversClientService;
    notificationService;
    slideImageUrls = [];
    constructor(configService, selversClientService, notificationService) {
        this.configService = configService;
        this.selversClientService = selversClientService;
        this.notificationService = notificationService;
    }
    async onModuleInit() {
        await this.setSlideImageUrls();
    }
    async setSlideImageUrls() {
        const storeId = this.configService.get('STORE_ID');
        const data = await this.selversClientService.store.getStoreTOrderMainImages(storeId);
        const prevSlideImageUrls = this.slideImageUrls;
        this.slideImageUrls = data.data
            .sort((a, b) => (parseInt(a.ranking, 10) > parseInt(b.ranking, 10) ? 1 : -1))
            .map(({ s3_url }) => s3_url);
        const isSlideImageChanged = prevSlideImageUrls.length !== this.slideImageUrls.length
            || prevSlideImageUrls.some((value, index) => value !== this.slideImageUrls[index]);
        if (isSlideImageChanged) {
            this.notificationService.sendNotification({
                type: 'SlideImageChanged',
                data: this.slideImageUrls,
            });
        }
    }
    async getAllSlideImages() {
        return { imageUrls: this.slideImageUrls };
    }
};
exports.StoreService = StoreService;
__decorate([
    (0, schedule_1.Cron)('* * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreService.prototype, "setSlideImageUrls", null);
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        selvers_client_service_1.SelversClientService,
        notification_service_1.NotificationService])
], StoreService);
//# sourceMappingURL=store.service.js.map