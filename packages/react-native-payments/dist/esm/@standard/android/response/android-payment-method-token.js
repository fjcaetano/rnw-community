import { emptyAndroidCardInfo } from './android-card-info';
import { emptyAndroidIntermediateSigningKey } from './android-intermediate-signing-key';
import { emptyAndroidSignedMessage } from './android-signed-message';
export const emptyAndroidPaymentMethodToken = {
    intermediateSigningKey: emptyAndroidIntermediateSigningKey,
    protocolVersion: '',
    signature: '',
    signedMessage: emptyAndroidSignedMessage,
    rawToken: '',
    cardInfo: emptyAndroidCardInfo,
};
//# sourceMappingURL=android-payment-method-token.js.map