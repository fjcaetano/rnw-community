"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyIosPKToken = void 0;
const ios_pk_payment_method_type_enum_1 = require("../enum/ios-pk-payment-method-type.enum");
const ios_payment_data_1 = require("./ios-payment-data");
exports.emptyIosPKToken = {
    paymentData: ios_payment_data_1.emptyIosPaymentData,
    paymentMethod: {
        displayName: '',
        network: '',
        type: ios_pk_payment_method_type_enum_1.IosPKPaymentMethodType.PKPaymentMethodTypeUnknown,
    },
    transactionIdentifier: '',
};
//# sourceMappingURL=ios-pk-token.js.map