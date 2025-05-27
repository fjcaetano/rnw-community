import { isDefined, isNotEmptyArray } from '@rnw-community/shared';
import { ConstructorError } from '../error/constructor.error';
/** @deprecated Move to PaymentRequest */
export const validatePaymentMethods = (methodData) => {
    // Check that at least one payment method is passed in
    if (!isNotEmptyArray(methodData)) {
        throw new ConstructorError(`At least one payment method is required`);
    }
    // Check that each payment method has at least one payment method identifier
    methodData.forEach(paymentMethod => {
        if (!isDefined(paymentMethod.supportedMethods)) {
            throw new ConstructorError(`required member supportedMethods is undefined.`);
        }
    });
};
//# sourceMappingURL=validate-payment-methods.util.js.map