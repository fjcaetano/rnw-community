import { isNotEmptyString } from '@rnw-community/shared';
import { emptyAndroidPaymentMethodToken } from '../../@standard/android/response/android-payment-method-token';
import { emptyIosPaymentData } from '../../@standard/ios/response/ios-payment-data';
import { PaymentResponse } from './payment-response';
export class IosPaymentResponse extends PaymentResponse {
    constructor(requestId, methodName, jsonData) {
        const data = JSON.parse(jsonData);
        super(requestId, methodName, {
            billingAddress: IosPaymentResponse.parsePKContact(data.billingContact?.postalAddress),
            applePayToken: IosPaymentResponse.parsePkToken(data.token),
            androidPayToken: emptyAndroidPaymentMethodToken,
            payerEmail: data.shippingContact?.emailAddress ?? '',
            payerName: IosPaymentResponse.parseNSPersonNameComponents(data.shippingContact?.name),
            payerPhone: IosPaymentResponse.parseCNPhoneNumber(data.shippingContact?.phoneNumber),
            shippingAddress: IosPaymentResponse.parsePKContact(data.shippingContact?.postalAddress),
        });
    }
    static parsePkToken(input) {
        return {
            ...input,
            paymentData: isNotEmptyString(input.paymentData)
                ? JSON.parse(input.paymentData)
                : emptyIosPaymentData,
        };
    }
    static parsePKContact(input) {
        return {
            countryCode: input?.ISOCountryCode ?? '',
            postalCode: input?.postalCode ?? '',
            address1: input?.street ?? '',
            address2: input?.city ?? '',
            address3: input?.state ?? '',
            administrativeArea: input?.subAdministrativeArea ?? '',
            locality: input?.subLocality ?? '',
            sortingCode: '',
        };
    }
    static parseNSPersonNameComponents(input) {
        return [input?.familyName, input?.middleName, input?.givenName].filter(isNotEmptyString).join(',');
    }
    static parseCNPhoneNumber(input) {
        return input?.stringValue ?? '';
    }
}
//# sourceMappingURL=ios-payment-response.js.map