import { isDefined } from '@rnw-community/shared';
import { emptyAndroidCardInfo } from '../../@standard/android/response/android-card-info';
import { emptyAndroidIntermediateSigningKey } from '../../@standard/android/response/android-intermediate-signing-key';
import { emptyAndroidPaymentMethodToken } from '../../@standard/android/response/android-payment-method-token';
import { emptyIosPKToken } from '../../@standard/ios/response/ios-pk-token';
import { PaymentResponse } from './payment-response';
export class AndroidPaymentResponse extends PaymentResponse {
    constructor(requestId, methodName, jsonData) {
        const data = JSON.parse(jsonData);
        super(requestId, methodName, {
            billingAddress: AndroidPaymentResponse.parseFullAddress(data.paymentMethodData.info.billingAddress),
            androidPayToken: {
                ...AndroidPaymentResponse.parseToken(data.paymentMethodData.tokenizationData.token),
                cardInfo: AndroidPaymentResponse.parseCardInfo(data.paymentMethodData.info),
            },
            applePayToken: emptyIosPKToken,
            payerEmail: data.email,
            ...(isDefined(data.shippingAddress) && {
                payerName: data.shippingAddress.name,
                payerPhone: data.shippingAddress.phoneNumber ?? '',
            }),
            ...(isDefined(data.paymentMethodData.info.billingAddress) && {
                payerName: data.paymentMethodData.info.billingAddress.name,
                payerPhone: data.paymentMethodData.info.billingAddress.phoneNumber ?? '',
            }),
            shippingAddress: AndroidPaymentResponse.parseFullAddress(data.shippingAddress),
        });
    }
    static parseToken(input = '{}') {
        if (input === 'examplePaymentMethodToken') {
            return emptyAndroidPaymentMethodToken;
        }
        const parsedToken = JSON.parse(input);
        return {
            ...emptyAndroidPaymentMethodToken,
            ...parsedToken,
            rawToken: input,
            intermediateSigningKey: {
                ...(isDefined(parsedToken.intermediateSigningKey)
                    ? {
                        ...parsedToken.intermediateSigningKey,
                        signedKey: JSON.parse(parsedToken.intermediateSigningKey.signedKey),
                    }
                    : emptyAndroidIntermediateSigningKey),
            },
            signedMessage: JSON.parse(parsedToken.signedMessage),
        };
    }
    static parseFullAddress(input) {
        return {
            country: input?.country ?? '',
            countryCode: input?.countryCode ?? '',
            postalCode: input?.postalCode ?? '',
            address1: input?.address1 ?? '',
            address2: input?.address2 ?? '',
            address3: input?.address3 ?? '',
            administrativeArea: input?.administrativeArea ?? '',
            locality: input?.locality ?? '',
            sortingCode: input?.sortingCode ?? '',
        };
    }
    static parseCardInfo(androidCardInfo) {
        return {
            ...emptyAndroidCardInfo,
            cardNetwork: androidCardInfo.cardNetwork,
            cardDetails: androidCardInfo.cardDetails,
            assuranceDetails: androidCardInfo.assuranceDetails,
        };
    }
}
//# sourceMappingURL=android-payment-response.js.map