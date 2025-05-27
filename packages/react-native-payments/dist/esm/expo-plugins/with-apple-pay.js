import { withEntitlementsPlist } from 'expo/config-plugins';
import { isDefined } from '@rnw-community/shared';
export const withApplePay = (initialConfig, { merchantIdentifier }) => {
    if (!isDefined(merchantIdentifier)) {
        throw new Error(`Pleas provide "@rnw-community/react-native-payments" plugin option "merchantIdentifier"`);
    }
    return withEntitlementsPlist(initialConfig, configWithEntitlements => {
        if (merchantIdentifier) {
            if (!isDefined(configWithEntitlements.modResults['com.apple.developer.in-app-payments'])) {
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
//# sourceMappingURL=with-apple-pay.js.map