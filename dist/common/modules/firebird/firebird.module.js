"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebirdModule = void 0;
const option_inject_key_constant_1 = require("./constants/option-inject-key.constant");
const firebird_service_1 = require("./firebird.service");
class FirebirdModule {
    static forRoot(options) {
        return {
            module: FirebirdModule,
            providers: [
                firebird_service_1.FirebirdService,
                { provide: option_inject_key_constant_1.OPTION_INJECT_KEY, useValue: options },
            ],
            exports: [firebird_service_1.FirebirdService],
        };
    }
    static forRootAsync(options) {
        return {
            module: FirebirdModule,
            imports: options.imports,
            providers: [
                firebird_service_1.FirebirdService,
                {
                    provide: option_inject_key_constant_1.OPTION_INJECT_KEY,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
            ],
            exports: [firebird_service_1.FirebirdService],
        };
    }
}
exports.FirebirdModule = FirebirdModule;
//# sourceMappingURL=firebird.module.js.map