import type { SupportedNetworkEnum } from '../enum/supported-networks.enum';
/**
 * Common PaymentMethod data field shared across platforms
 */
export interface GenericPaymentMethodDataDataInterface {
    countryCode?: string;
    currencyCode: string;
    requestBillingAddress?: boolean;
    requestPayerEmail?: boolean;
    requestPayerName?: boolean;
    requestPayerPhone?: boolean;
    requestShipping?: boolean;
    supportedNetworks: SupportedNetworkEnum[];
}
//# sourceMappingURL=generic-payment-method-data-data.interface.d.ts.map