"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelversEasycallClient = void 0;
const response_error_handle_util_1 = require("../utils/response-error-handle.util");
class SelversEasycallClient {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    genFullPath(url) {
        return `http://easycall.selfood.co.kr${url}`;
    }
    async getCallStaffOptions(storeId) {
        const url = this.genFullPath('/api/easyCall/v2/easyCallSetupList.json');
        return await (0, response_error_handle_util_1.responseErrorHandle)('직원 호출 옵션 조회', this.httpService.get(url, {
            params: {
                store_id: storeId,
            },
        }));
    }
    async callStaff(storeId, tableId, options) {
        const url = this.genFullPath('/api/easyCall/v2/reqEasyCall.json');
        const params = new URLSearchParams();
        params.append('store_id', storeId);
        params.append('store_table_id', tableId);
        options.forEach((option, index) => {
            params.append(`easy_call_setup_ids[${index}]`, option.id);
            params.append(`item_names[${index}]`, option.title);
            params.append(`req_cnt[${index}]`, option.count.toString());
        });
        await (0, response_error_handle_util_1.responseErrorHandle)('직원 호출', this.httpService.post(url, params), {
            store_table_id: tableId,
            options: JSON.stringify(options),
        });
        return true;
    }
}
exports.SelversEasycallClient = SelversEasycallClient;
//# sourceMappingURL=selvers-easycall-client.js.map