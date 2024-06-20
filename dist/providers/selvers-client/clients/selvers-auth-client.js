"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelversAuthClient = void 0;
const response_error_handle_util_1 = require("../utils/response-error-handle.util");
const selvers_www_client_1 = require("./selvers-www-client");
class SelversAuthClient extends selvers_www_client_1.SelversWWWClient {
    async tableLogin(userId, userPw) {
        const url = this.genFullPath('/login/table_index.json');
        const params = new URLSearchParams();
        params.append('user_id', userId);
        params.append('user_pwd', userPw);
        return await (0, response_error_handle_util_1.responseErrorHandle)('테이블 로그인', this.httpService.post(url, params), {
            user_id: userId,
            user_pwd: userPw,
        });
    }
}
exports.SelversAuthClient = SelversAuthClient;
//# sourceMappingURL=selvers-auth-client.js.map