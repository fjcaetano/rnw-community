"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withGooglePay = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const withGooglePay = initialConfig => (0, config_plugins_1.withAndroidManifest)(initialConfig, config => {
    var _a, _b;
    const androidManifest = config.modResults;
    const mainApplication = (_a = androidManifest.manifest.application) === null || _a === void 0 ? void 0 : _a[0];
    if (mainApplication) {
        const existingMetaData = (_b = mainApplication['meta-data']) === null || _b === void 0 ? void 0 : _b.find(metadata => metadata.$['android:name'] === 'com.google.android.gms.wallet.api.enabled');
        if (!existingMetaData) {
            if (!mainApplication['meta-data']) {
                mainApplication['meta-data'] = [];
            }
            mainApplication['meta-data'].push({
                // eslint-disable-next-line id-length
                $: {
                    'android:name': 'com.google.android.gms.wallet.api.enabled',
                    'android:value': 'true',
                },
            });
        }
    }
    return config;
});
exports.withGooglePay = withGooglePay;
//# sourceMappingURL=with-google-pay.js.map