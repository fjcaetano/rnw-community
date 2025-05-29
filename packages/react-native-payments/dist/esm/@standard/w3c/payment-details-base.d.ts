import type { PaymentDetailsModifier } from './payment-details-modifier';
import type { PaymentItem } from './payment-item';
export interface PaymentDetailsBase {
    displayItems?: PaymentItem[];
    modifiers?: PaymentDetailsModifier[];
    shippingOptions?: PaymentShippingOption[];
}
//# sourceMappingURL=payment-details-base.d.ts.map