import type { PaymentItem } from './payment-item';
import type { SupportedNetworkEnum } from '../../enum/supported-networks.enum';
export interface PaymentDetailsModifier {
    additionalDisplayItems: PaymentItem[];
    data: Record<string, string>;
    supportedMethods: SupportedNetworkEnum;
}
//# sourceMappingURL=payment-details-modifier.d.ts.map