"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelversStoreClient = void 0;
const response_error_handle_util_1 = require("../utils/response-error-handle.util");
const selvers_www_client_1 = require("./selvers-www-client");
class SelversStoreClient extends selvers_www_client_1.SelversWWWClient {
    async getStoreTOrderMainImages(storeId) {
        const url = this.genFullPath('/api/tableOrder/v2/getStoreTOrderMainImages.json');
        return await (0, response_error_handle_util_1.responseErrorHandle)('슬라이드 이미지 조회', this.httpService.get(url, {
            params: {
                store_id: storeId,
            },
        }));
    }
}
exports.SelversStoreClient = SelversStoreClient;
//# sourceMappingURL=selvers-store-client.js.map