import type { IosPKPaymentMethodType } from '../enum/ios-pk-payment-method-type.enum';
export interface IosRawPKToken {
    paymentData: string;
    paymentMethod: {
        displayName: string;
        network: string;
        type: IosPKPaymentMethodType;
    };
    transactionIdentifier: string;
}
//# sourceMappingURL=ios-raw-pk-token.d.ts.map