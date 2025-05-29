import type { IOSPKContactField } from '../enum/ios-pk-contact-field.enum';
import type { IosPKMerchantCapability } from '../enum/ios-pk-merchant-capability.enum';
import type { IosPKPaymentNetworksEnum } from '../enum/ios-pk-payment-networks.enum';
export interface IosPaymentDataRequest {
    countryCode: string;
    currencyCode: string;
    merchantCapabilities: IosPKMerchantCapability[];
    merchantIdentifier: string;
    requiredBillingContactFields?: IOSPKContactField[];
    requiredShippingContactFields?: IOSPKContactField[];
    supportedNetworks: IosPKPaymentNetworksEnum[];
}
//# sourceMappingURL=ios-payment-data-request.d.ts.map