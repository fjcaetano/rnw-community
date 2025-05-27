import { withPlugins } from '@expo/config-plugins';
import { withApplePay } from './with-apple-pay';
import { withGooglePay } from './with-google-pay';
export const withPayments = (config, props) => withPlugins(config, [
    [withApplePay, props],
    [withGooglePay, props],
]);
//# sourceMappingURL=with-payments.js.map