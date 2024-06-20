"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallStaffModule = void 0;
const common_1 = require("@nestjs/common");
const selvers_client_module_1 = require("../../providers/selvers-client/selvers-client.module");
const call_staff_controller_1 = require("./call-staff.controller");
const call_staff_service_1 = require("./call-staff.service");
let CallStaffModule = class CallStaffModule {
};
exports.CallStaffModule = CallStaffModule;
exports.CallStaffModule = CallStaffModule = __decorate([
    (0, common_1.Module)({
        imports: [
            selvers_client_module_1.SelversClientModule,
        ],
        controllers: [
            call_staff_controller_1.CallStaffController,
        ],
        providers: [
            call_staff_service_1.CallStaffService,
        ],
    })
], CallStaffModule);
//# sourceMappingURL=call-staff.module.js.map