"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseErrorHandle = void 0;
const rxjs_1 = require("rxjs");
class ResponseError extends Error {
    constructor(apiName) {
        super(`${apiName}에 실패했습니다.`);
    }
}
async function responseErrorHandle(apiName, request, additionalLogs = {}, customHandlers) {
    const { data } = await (0, rxjs_1.firstValueFrom)(request.pipe((0, rxjs_1.catchError)((err) => {
        const axiosErrorLogger = () => console.error(`[${apiName}] Axios Error\n`, Object.keys(additionalLogs).map(key => `${key}: ${additionalLogs[key]}\n`), err);
        if (customHandlers && customHandlers.axiosHandler) {
            customHandlers.axiosHandler(err);
        }
        axiosErrorLogger();
        throw new ResponseError(apiName);
    })));
    const responseErrorLogger = () => console.error(`[${apiName}] Response Error\n`, ...Object.keys(additionalLogs).map(key => `Parameter: ${key}: ${additionalLogs[key]}\n`), `Response: ${JSON.stringify(data)}`);
    if (customHandlers && customHandlers.responseHandler) {
        await customHandlers.responseHandler(data, responseErrorLogger, new ResponseError(apiName));
    }
    else if (data.result !== 'ok') {
        responseErrorLogger();
        throw new ResponseError(apiName);
    }
    return data;
}
exports.responseErrorHandle = responseErrorHandle;
//# sourceMappingURL=response-error-handle.util.js.map