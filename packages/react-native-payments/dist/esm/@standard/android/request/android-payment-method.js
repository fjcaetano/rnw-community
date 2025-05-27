import { AndroidAllowedAuthMethodsEnum } from '../enum/android-allowed-auth-methods.enum';
export const defaultAndroidPaymentMethod = {
    parameters: {
        allowedAuthMethods: [AndroidAllowedAuthMethodsEnum.PAN_ONLY, AndroidAllowedAuthMethodsEnum.CRYPTOGRAM_3DS],
        allowedCardNetworks: [],
    },
    type: 'CARD',
};
//# sourceMappingURL=android-payment-method.js.map