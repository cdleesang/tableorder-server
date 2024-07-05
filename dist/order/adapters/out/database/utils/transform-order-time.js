"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformOrderTime = void 0;
function transformOrderTime(orderTime) {
    const regex = /(^\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
    if (!regex.test(orderTime)) {
        throw new Error('Invalid orderTime format');
    }
    const isoDateTimeStr = orderTime.replace(regex, '$1-$2-$3T$4:$5:$6+09:00');
    return new Date(isoDateTimeStr);
}
exports.transformOrderTime = transformOrderTime;
//# sourceMappingURL=transform-order-time.js.map