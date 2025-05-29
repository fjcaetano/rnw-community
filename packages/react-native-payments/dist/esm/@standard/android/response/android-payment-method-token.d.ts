import { type AndroidCardInfo } from './android-card-info';
import type { AndroidIntermediateSigningKey } from './android-intermediate-signing-key';
import type { AndroidSignedMessage } from './android-signed-message';
export interface AndroidPaymentMethodToken {
    cardInfo: AndroidCardInfo;
    intermediateSigningKey: AndroidIntermediateSigningKey;
    protocolVersion: string;
    rawToken: string;
    signature: string;
    signedMessage: AndroidSignedMessage;
}
export declare const emptyAndroidPaymentMethodToken: AndroidPaymentMethodToken;
//# sourceMappingURL=android-payment-method-token.d.ts.map