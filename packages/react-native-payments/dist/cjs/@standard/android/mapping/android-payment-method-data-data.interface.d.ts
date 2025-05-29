import type { EnvironmentEnum } from '../../../enum/environment.enum';
import type { GenericPaymentMethodDataDataInterface } from '../../../interface/generic-payment-method-data-data.interface';
import type { AndroidAllowedAuthMethodsEnum } from '../enum/android-allowed-auth-methods.enum';
import type { AndroidTokenizationDirectSpecification } from '../request/android-tokenization-direct-specification';
import type { AndroidTokenizationGatewaySpecification } from '../request/android-tokenization-gateway-specification';
interface AndroidGenericPaymentMethodDataInterface extends GenericPaymentMethodDataDataInterface {
    allowedAuthMethods?: AndroidAllowedAuthMethodsEnum[];
    environment: EnvironmentEnum;
}
export type AndroidPaymentMethodDataDataInterface = AndroidGenericPaymentMethodDataInterface & ({
    directConfig: AndroidTokenizationDirectSpecification['parameters'];
    gatewayConfig?: never;
} | {
    directConfig?: never;
    gatewayConfig: AndroidTokenizationGatewaySpecification['parameters'];
});
export {};
//# sourceMappingURL=android-payment-method-data-data.interface.d.ts.map