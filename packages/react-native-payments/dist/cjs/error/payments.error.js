"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsError = void 0;
class PaymentsError extends Error {
    constructor(message) {
        super(`[ReactNativePayments] ${message}`);
    }
}
exports.PaymentsError = PaymentsError;
//# sourceMappingURL=payments.error.js.map