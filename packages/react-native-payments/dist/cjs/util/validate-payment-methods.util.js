"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePaymentMethods = void 0;
const shared_1 = require("@rnw-community/shared");
const constructor_error_1 = require("../error/constructor.error");
/** @deprecated Move to PaymentRequest */
const validatePaymentMethods = (methodData) => {
    // Check that at least one payment method is passed in
    if (!(0, shared_1.isNotEmptyArray)(methodData)) {
        throw new constructor_error_1.ConstructorError(`At least one payment method is required`);
    }
    // Check that each payment method has at least one payment method identifier
    methodData.forEach(paymentMethod => {
        if (!(0, shared_1.isDefined)(paymentMethod.supportedMethods)) {
            throw new constructor_error_1.ConstructorError(`required member supportedMethods is undefined.`);
        }
    });
};
exports.validatePaymentMethods = validatePaymentMethods;
//# sourceMappingURL=validate-payment-methods.util.js.map