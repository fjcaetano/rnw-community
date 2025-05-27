"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPayments = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const with_apple_pay_1 = require("./with-apple-pay");
const with_google_pay_1 = require("./with-google-pay");
const withPayments = (config, props) => (0, config_plugins_1.withPlugins)(config, [
    [with_apple_pay_1.withApplePay, props],
    [with_google_pay_1.withGooglePay, props],
]);
exports.withPayments = withPayments;
//# sourceMappingURL=with-payments.js.map