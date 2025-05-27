"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAndroidPaymentDataRequest = void 0;
const android_payment_method_1 = require("./android-payment-method");
const android_transaction_info_1 = require("./android-transaction-info");
exports.defaultAndroidPaymentDataRequest = {
    allowedPaymentMethods: [android_payment_method_1.defaultAndroidPaymentMethod],
    apiVersion: 2,
    apiVersionMinor: 0,
    transactionInfo: android_transaction_info_1.defaultAndroidTransactionInfo,
};
//# sourceMappingURL=android-payment-data-request.js.map