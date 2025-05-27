"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMException = void 0;
const payments_error_enum_1 = require("../enum/payments-error.enum");
const payments_error_1 = require("./payments.error");
// TODO: Should we rename to DOMError?
class DOMException extends payments_error_1.PaymentsError {
    constructor(errorType) {
        super(`[DOMException]: ${DOMException.messages[errorType]}`);
    }
}
exports.DOMException = DOMException;
DOMException.messages = {
    [payments_error_enum_1.PaymentsErrorEnum.AbortError]: 'The operation was aborted.',
    [payments_error_enum_1.PaymentsErrorEnum.InvalidStateError]: 'The object is in an invalid state.',
    [payments_error_enum_1.PaymentsErrorEnum.NotAllowedError]: 'The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.',
    [payments_error_enum_1.PaymentsErrorEnum.NotSupportedError]: 'The operation is not supported.',
    [payments_error_enum_1.PaymentsErrorEnum.SecurityError]: 'The operation is insecure.',
};
//# sourceMappingURL=dom.exception.js.map