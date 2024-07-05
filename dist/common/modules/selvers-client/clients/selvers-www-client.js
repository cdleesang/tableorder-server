"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelversWWWClient = void 0;
class SelversWWWClient {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    genFullPath(url) {
        return `http://www.selfood.co.kr${url}`;
    }
}
exports.SelversWWWClient = SelversWWWClient;
//# sourceMappingURL=selvers-www-client.js.map