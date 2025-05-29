import { IosPKPaymentMethodType } from '../enum/ios-pk-payment-method-type.enum';
import type { IosPaymentData } from './ios-payment-data';
export interface IosPKToken {
    paymentData: IosPaymentData;
    paymentMethod: {
        displayName: string;
        network: string;
        type: IosPKPaymentMethodType;
    };
    transactionIdentifier: string;
}
export declare const emptyIosPKToken: IosPKToken;
//# sourceMappingURL=ios-pk-token.d.ts.map