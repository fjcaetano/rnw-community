import type { AndroidPaymentMethodCardParameters } from './android-payment-method-card-parameters';
import type { AndroidTokenizationDirectSpecification } from './android-tokenization-direct-specification';
import type { AndroidTokenizationGatewaySpecification } from './android-tokenization-gateway-specification';
export interface AndroidPaymentMethod {
    parameters: AndroidPaymentMethodCardParameters;
    tokenizationSpecification?: AndroidTokenizationDirectSpecification | AndroidTokenizationGatewaySpecification;
    type: 'CARD';
}
export declare const defaultAndroidPaymentMethod: AndroidPaymentMethod;
//# sourceMappingURL=android-payment-method.d.ts.map