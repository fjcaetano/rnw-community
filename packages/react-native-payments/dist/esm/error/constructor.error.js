import { PaymentsError } from './payments.error';
export class ConstructorError extends PaymentsError {
    constructor(message) {
        super(`Failed to construct 'PaymentRequest':  ${message}`);
    }
}
//# sourceMappingURL=constructor.error.js.map