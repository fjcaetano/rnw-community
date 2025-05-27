import { IosPKPaymentMethodType } from '../enum/ios-pk-payment-method-type.enum';
import { emptyIosPaymentData } from './ios-payment-data';
export const emptyIosPKToken = {
    paymentData: emptyIosPaymentData,
    paymentMethod: {
        displayName: '',
        network: '',
        type: IosPKPaymentMethodType.PKPaymentMethodTypeUnknown,
    },
    transactionIdentifier: '',
};
//# sourceMappingURL=ios-pk-token.js.map