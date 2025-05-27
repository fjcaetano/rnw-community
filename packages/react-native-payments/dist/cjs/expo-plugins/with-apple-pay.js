"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withApplePay = void 0;
const config_plugins_1 = require("expo/config-plugins");
const shared_1 = require("@rnw-community/shared");
const withApplePay = (initialConfig, { merchantIdentifier }) => {
    if (!(0, shared_1.isDefined)(merchantIdentifier)) {
        throw new Error(`Pleas provide "@rnw-community/react-native-payments" plugin option "merchantIdentifier"`);
    }
    return (0, config_plugins_1.withEntitlementsPlist)(initialConfig, configWithEntitlements => {
        if (merchantIdentifier) {
            if (!(0, shared_1.isDefined)(configWithEntitlements.modResults['com.apple.developer.in-app-payments'])) {
                configWithEntitlements.modResults['com.apple.developer.in-app-payments'] = [];
            }
            const applePayArray = configWithEntitlements.modResults['com.apple.developer.in-app-payments'];
            if (!applePayArray.includes(merchantIdentifier)) {
                applePayArray.push(merchantIdentifier);
            }
        }
        return configWithEntitlements;
    });
};
exports.withApplePay = withApplePay;
//# sourceMappingURL=with-apple-pay.js.map