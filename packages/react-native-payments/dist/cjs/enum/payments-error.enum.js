"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsErrorEnum = void 0;
var PaymentsErrorEnum;
(function (PaymentsErrorEnum) {
    PaymentsErrorEnum["AbortError"] = "The operation was aborted.";
    PaymentsErrorEnum["InvalidStateError"] = "The object is in an invalid state.";
    PaymentsErrorEnum["NotAllowedError"] = "The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.";
    PaymentsErrorEnum["NotSupportedError"] = "The operation is not supported.";
    PaymentsErrorEnum["SecurityError"] = "The operation is insecure.";
})(PaymentsErrorEnum || (exports.PaymentsErrorEnum = PaymentsErrorEnum = {}));
//# sourceMappingURL=payments-error.enum.js.map