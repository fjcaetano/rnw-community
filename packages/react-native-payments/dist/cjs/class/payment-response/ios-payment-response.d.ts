import { PaymentResponse } from './payment-response';
export declare class IosPaymentResponse extends PaymentResponse {
    constructor(requestId: string, methodName: string, jsonData: string);
    private static parsePkToken;
    private static parsePKContact;
    private static parseNSPersonNameComponents;
    private static parseCNPhoneNumber;
}
//# sourceMappingURL=ios-payment-response.d.ts.map