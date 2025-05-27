"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorError = void 0;
const payments_error_1 = require("./payments.error");
class ConstructorError extends payments_error_1.PaymentsError {
    constructor(message) {
        super(`Failed to construct 'PaymentRequest':  ${message}`);
    }
}
exports.ConstructorError = ConstructorError;
//# sourceMappingURL=constructor.error.js.map