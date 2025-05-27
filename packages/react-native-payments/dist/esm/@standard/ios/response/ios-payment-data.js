/*
 * https://developer.apple.com/documentation/passkit/pkpaymenttoken/1617000-paymentdata?language=objc
 * https://developer.apple.com/documentation/passkit/apple_pay/payment_token_format_reference?language=objc
 */
import { emptyIosPaymentDataHeader } from './ios-payment-data-header';
export const emptyIosPaymentData = {
    data: '',
    header: emptyIosPaymentDataHeader,
    signature: '',
    version: '',
};
//# sourceMappingURL=ios-payment-data.js.map