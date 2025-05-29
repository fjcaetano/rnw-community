import type { AndroidMerchantInfo } from './android-merchant-info';
import type { AndroidPaymentMethod } from './android-payment-method';
import type { AndroidShippingAddressParameters } from './android-shipping-address-parameters';
import type { AndroidTransactionInfo } from './android-transaction-info';
export interface AndroidPaymentDataRequest {
    allowedPaymentMethods: AndroidPaymentMethod[];
    apiVersion: 2;
    apiVersionMinor: 0;
    emailRequired?: boolean;
    merchantInfo?: AndroidMerchantInfo;
    shippingAddressParameters?: AndroidShippingAddressParameters;
    shippingAddressRequired?: boolean;
    transactionInfo: AndroidTransactionInfo;
}
export declare const defaultAndroidPaymentDataRequest: AndroidPaymentDataRequest;
//# sourceMappingURL=android-payment-data-request.d.ts.map