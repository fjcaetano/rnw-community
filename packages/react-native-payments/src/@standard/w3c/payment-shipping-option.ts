import { PaymentItem } from './payment-item';

// https://www.w3.org/TR/payment-request/#paymentshippingoption-dictionary
export interface PaymentShippingOption extends PaymentItem {
    id: string;
    detail?: string;
    dateRange?: {
        startDate: number;
        endDate: number;
    };
}
