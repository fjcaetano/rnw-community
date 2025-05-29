import { PaymentResponse } from './payment-response';
export declare class AndroidPaymentResponse extends PaymentResponse {
    constructor(requestId: string, methodName: string, jsonData: string);
    private static parseToken;
    private static parseFullAddress;
    private static parseCardInfo;
}
//# sourceMappingURL=android-payment-response.d.ts.map