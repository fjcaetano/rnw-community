"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidPaymentResponse = void 0;
const shared_1 = require("@rnw-community/shared");
const android_card_info_1 = require("../../@standard/android/response/android-card-info");
const android_intermediate_signing_key_1 = require("../../@standard/android/response/android-intermediate-signing-key");
const android_payment_method_token_1 = require("../../@standard/android/response/android-payment-method-token");
const ios_pk_token_1 = require("../../@standard/ios/response/ios-pk-token");
const payment_response_1 = require("./payment-response");
class AndroidPaymentResponse extends payment_response_1.PaymentResponse {
    constructor(requestId, methodName, jsonData) {
        var _a, _b;
        const data = JSON.parse(jsonData);
        super(requestId, methodName, Object.assign(Object.assign(Object.assign({ billingAddress: AndroidPaymentResponse.parseFullAddress(data.paymentMethodData.info.billingAddress), androidPayToken: Object.assign(Object.assign({}, AndroidPaymentResponse.parseToken(data.paymentMethodData.tokenizationData.token)), { cardInfo: AndroidPaymentResponse.parseCardInfo(data.paymentMethodData.info) }), applePayToken: ios_pk_token_1.emptyIosPKToken, payerEmail: data.email }, ((0, shared_1.isDefined)(data.shippingAddress) && {
            payerName: data.shippingAddress.name,
            payerPhone: (_a = data.shippingAddress.phoneNumber) !== null && _a !== void 0 ? _a : '',
        })), ((0, shared_1.isDefined)(data.paymentMethodData.info.billingAddress) && {
            payerName: data.paymentMethodData.info.billingAddress.name,
            payerPhone: (_b = data.paymentMethodData.info.billingAddress.phoneNumber) !== null && _b !== void 0 ? _b : '',
        })), { shippingAddress: AndroidPaymentResponse.parseFullAddress(data.shippingAddress) }));
    }
    static parseToken(input = '{}') {
        if (input === 'examplePaymentMethodToken') {
            return android_payment_method_token_1.emptyAndroidPaymentMethodToken;
        }
        const parsedToken = JSON.parse(input);
        return Object.assign(Object.assign(Object.assign({}, android_payment_method_token_1.emptyAndroidPaymentMethodToken), parsedToken), { rawToken: input, intermediateSigningKey: Object.assign({}, ((0, shared_1.isDefined)(parsedToken.intermediateSigningKey)
                ? Object.assign(Object.assign({}, parsedToken.intermediateSigningKey), { signedKey: JSON.parse(parsedToken.intermediateSigningKey.signedKey) }) : android_intermediate_signing_key_1.emptyAndroidIntermediateSigningKey)), signedMessage: JSON.parse(parsedToken.signedMessage) });
    }
    static parseFullAddress(input) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return {
            countryCode: (_a = input === null || input === void 0 ? void 0 : input.countryCode) !== null && _a !== void 0 ? _a : '',
            postalCode: (_b = input === null || input === void 0 ? void 0 : input.postalCode) !== null && _b !== void 0 ? _b : '',
            address1: (_c = input === null || input === void 0 ? void 0 : input.address1) !== null && _c !== void 0 ? _c : '',
            address2: (_d = input === null || input === void 0 ? void 0 : input.address2) !== null && _d !== void 0 ? _d : '',
            address3: (_e = input === null || input === void 0 ? void 0 : input.address3) !== null && _e !== void 0 ? _e : '',
            administrativeArea: (_f = input === null || input === void 0 ? void 0 : input.administrativeArea) !== null && _f !== void 0 ? _f : '',
            locality: (_g = input === null || input === void 0 ? void 0 : input.locality) !== null && _g !== void 0 ? _g : '',
            sortingCode: (_h = input === null || input === void 0 ? void 0 : input.sortingCode) !== null && _h !== void 0 ? _h : '',
        };
    }
    static parseCardInfo(androidCardInfo) {
        return Object.assign(Object.assign({}, android_card_info_1.emptyAndroidCardInfo), { cardNetwork: androidCardInfo.cardNetwork, cardDetails: androidCardInfo.cardDetails, assuranceDetails: androidCardInfo.assuranceDetails });
    }
}
exports.AndroidPaymentResponse = AndroidPaymentResponse;
//# sourceMappingURL=android-payment-response.js.map