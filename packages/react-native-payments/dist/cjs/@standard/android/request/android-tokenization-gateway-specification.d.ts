import type { AndroidPaymentMethodTokenizationType } from '../enum/android-payment-method-tokenization-type.enum';
export interface AndroidTokenizationGatewaySpecification {
    parameters: Record<string, string> & {
        gateway: string;
        gatewayMerchantId: string;
    };
    type: AndroidPaymentMethodTokenizationType.PAYMENT_GATEWAY;
}
//# sourceMappingURL=android-tokenization-gateway-specification.d.ts.map