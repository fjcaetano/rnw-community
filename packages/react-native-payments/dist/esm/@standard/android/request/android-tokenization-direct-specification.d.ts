import type { AndroidPaymentMethodTokenizationType } from '../enum/android-payment-method-tokenization-type.enum';
export interface AndroidTokenizationDirectSpecification {
    parameters: Record<string, string> & {
        protocolVersion: string;
        publicKey: string;
    };
    type: AndroidPaymentMethodTokenizationType.DIRECT;
}
//# sourceMappingURL=android-tokenization-direct-specification.d.ts.map