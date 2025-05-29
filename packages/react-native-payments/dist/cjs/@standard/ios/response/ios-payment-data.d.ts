import type { IosPaymentDataHeader } from './ios-payment-data-header';
export interface IosPaymentData {
    data: string;
    header: IosPaymentDataHeader;
    signature: string;
    version: string;
}
export declare const emptyIosPaymentData: IosPaymentData;
//# sourceMappingURL=ios-payment-data.d.ts.map