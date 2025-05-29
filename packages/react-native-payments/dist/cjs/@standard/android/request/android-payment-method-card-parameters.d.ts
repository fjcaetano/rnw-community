import type { AndroidBillingAddressParameters } from './android-billing-address-parameters';
import type { AndroidAllowedAuthMethodsEnum } from '../enum/android-allowed-auth-methods.enum';
import type { AndroidAllowedCardNetworksEnum } from '../enum/android-allowed-card-networks.enum';
export interface AndroidPaymentMethodCardParameters {
    allowCreditCards?: boolean;
    allowPrepaidCards?: boolean;
    allowedAuthMethods: AndroidAllowedAuthMethodsEnum[];
    allowedCardNetworks: AndroidAllowedCardNetworksEnum[];
    assuranceDetailsRequired?: boolean;
    billingAddressParameters?: AndroidBillingAddressParameters;
    billingAddressRequired?: boolean;
}
//# sourceMappingURL=android-payment-method-card-parameters.d.ts.map