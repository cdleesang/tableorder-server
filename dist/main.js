"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const fs_1 = require("fs");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['warn', 'error', 'verbose'],
    });
    const PORT = 3000;
    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
        const swaggerPath = (0, path_1.join)(process.cwd(), 'dist', 'swagger.json');
        if ((0, fs_1.existsSync)(swaggerPath)) {
            const document = JSON.parse((0, fs_1.readFileSync)(swaggerPath).toString('utf-8'));
            swagger_1.SwaggerModule.setup('docs', app, document);
        }
    }
    await app.listen(PORT, () => {
        process.send?.('ready');
        common_1.Logger.verbose(`테이블 오더 동작 중... 포트: ${PORT}`, 'Bootstrap');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map