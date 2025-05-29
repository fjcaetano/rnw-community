import type { PaymentValidationErrors } from '../../@standard/w3c/payment-validation-errors';
import type { PaymentComplete } from '../../enum/payment-complete.enum';
import type { PaymentResponseDetailsInterface } from '../../interface/payment-response-details.interface';
export declare class PaymentResponse {
    readonly requestId: string;
    readonly methodName: string;
    readonly details: PaymentResponseDetailsInterface;
    private completeCalled;
    constructor(requestId: string, methodName: string, details: PaymentResponseDetailsInterface);
    complete(result: PaymentComplete): Promise<void>;
    retry(_errorFields?: PaymentValidationErrors): Promise<undefined>;
}
//# sourceMappingURL=payment-response.d.ts.map