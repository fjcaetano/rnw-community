"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyIosPaymentData = void 0;
/*
 * https://developer.apple.com/documentation/passkit/pkpaymenttoken/1617000-paymentdata?language=objc
 * https://developer.apple.com/documentation/passkit/apple_pay/payment_token_format_reference?language=objc
 */
const ios_payment_data_header_1 = require("./ios-payment-data-header");
exports.emptyIosPaymentData = {
    data: '',
    header: ios_payment_data_header_1.emptyIosPaymentDataHeader,
    signature: '',
    version: '',
};
//# sourceMappingURL=ios-payment-data.js.map