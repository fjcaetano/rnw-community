import { PaymentItem } from './payment-item';
export interface PaymentShippingOption extends PaymentItem {
    id: string;
    detail?: string;
    dateRange?: {
        startDate: number;
        endDate: number;
    };
}
//# sourceMappingURL=payment-shipping-option.d.ts.map