"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentResponse = void 0;
const native_payments_1 = require("../native-payments/native-payments");
/*
 * https://www.w3.org/TR/payment-request/#paymentresponse-interface
 */
class PaymentResponse {
    constructor(
    // https://www.w3.org/TR/payment-request/#dom-paymentresponse-requestid
    requestId, 
    // https://www.w3.org/TR/payment-request/#dom-paymentresponse-methodname
    methodName, 
    // https://www.w3.org/TR/payment-request/#dom-paymentresponse-details
    details) {
        this.requestId = requestId;
        this.methodName = methodName;
        this.details = details;
        this.completeCalled = false;
    }
    // https://www.w3.org/TR/payment-request/#complete-method
    async complete(result) {
        if (this.completeCalled) {
            throw new Error('InvalidStateError');
        }
        this.completeCalled = true;
        // TODO: Implement logic https://www.w3.org/TR/payment-request/#complete-method
        return native_payments_1.NativePayments.complete(result);
    }
    // https://www.w3.org/TR/payment-request/#dom-paymentresponse-retry
    // eslint-disable-next-line @typescript-eslint/require-await
    async retry(_errorFields) {
        if (this.completeCalled) {
            throw new Error('InvalidStateError');
        }
        // TODO: Implement logic https://www.w3.org/TR/payment-request/#retry-method
        return undefined;
    }
}
exports.PaymentResponse = PaymentResponse;
//# sourceMappingURL=payment-response.js.map