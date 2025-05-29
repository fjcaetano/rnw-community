import type { IosPKContact } from './ios-pk-contact';
import type { IosPKShippingMethod } from './ios-pk-shipping-method';
import type { IosRawPKToken } from './ios-raw-pk-token';
export interface IosPKPayment {
    billingContact?: Pick<IosPKContact, 'postalAddress'>;
    shippingContact?: IosPKContact;
    shippingMethod?: IosPKShippingMethod;
    token: IosRawPKToken;
}
//# sourceMappingURL=ios-pk-payment.d.ts.map