"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAndroidPaymentMethod = void 0;
const android_allowed_auth_methods_enum_1 = require("../enum/android-allowed-auth-methods.enum");
exports.defaultAndroidPaymentMethod = {
    parameters: {
        allowedAuthMethods: [android_allowed_auth_methods_enum_1.AndroidAllowedAuthMethodsEnum.PAN_ONLY, android_allowed_auth_methods_enum_1.AndroidAllowedAuthMethodsEnum.CRYPTOGRAM_3DS],
        allowedCardNetworks: [],
    },
    type: 'CARD',
};
//# sourceMappingURL=android-payment-method.js.map