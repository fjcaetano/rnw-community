"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IosPaymentResponse = void 0;
const shared_1 = require("@rnw-community/shared");
const android_payment_method_token_1 = require("../../@standard/android/response/android-payment-method-token");
const ios_payment_data_1 = require("../../@standard/ios/response/ios-payment-data");
const payment_response_1 = require("./payment-response");
class IosPaymentResponse extends payment_response_1.PaymentResponse {
    constructor(requestId, methodName, jsonData) {
        var _a, _b, _c, _d, _e, _f;
        const data = JSON.parse(jsonData);
        super(requestId, methodName, {
            billingAddress: IosPaymentResponse.parsePKContact((_a = data.billingContact) === null || _a === void 0 ? void 0 : _a.postalAddress),
            applePayToken: IosPaymentResponse.parsePkToken(data.token),
            androidPayToken: android_payment_method_token_1.emptyAndroidPaymentMethodToken,
            payerEmail: (_c = (_b = data.shippingContact) === null || _b === void 0 ? void 0 : _b.emailAddress) !== null && _c !== void 0 ? _c : '',
            payerName: IosPaymentResponse.parseNSPersonNameComponents((_d = data.shippingContact) === null || _d === void 0 ? void 0 : _d.name),
            payerPhone: IosPaymentResponse.parseCNPhoneNumber((_e = data.shippingContact) === null || _e === void 0 ? void 0 : _e.phoneNumber),
            shippingAddress: IosPaymentResponse.parsePKContact((_f = data.shippingContact) === null || _f === void 0 ? void 0 : _f.postalAddress),
        });
    }
    static parsePkToken(input) {
        return Object.assign(Object.assign({}, input), { paymentData: (0, shared_1.isNotEmptyString)(input.paymentData)
                ? JSON.parse(input.paymentData)
                : ios_payment_data_1.emptyIosPaymentData });
    }
    static parsePKContact(input) {
        var _a, _b, _c, _d, _e, _f, _g;
        return {
            countryCode: (_a = input === null || input === void 0 ? void 0 : input.ISOCountryCode) !== null && _a !== void 0 ? _a : '',
            postalCode: (_b = input === null || input === void 0 ? void 0 : input.postalCode) !== null && _b !== void 0 ? _b : '',
            address1: (_c = input === null || input === void 0 ? void 0 : input.street) !== null && _c !== void 0 ? _c : '',
            address2: (_d = input === null || input === void 0 ? void 0 : input.city) !== null && _d !== void 0 ? _d : '',
            address3: (_e = input === null || input === void 0 ? void 0 : input.state) !== null && _e !== void 0 ? _e : '',
            administrativeArea: (_f = input === null || input === void 0 ? void 0 : input.subAdministrativeArea) !== null && _f !== void 0 ? _f : '',
            locality: (_g = input === null || input === void 0 ? void 0 : input.subLocality) !== null && _g !== void 0 ? _g : '',
            sortingCode: '',
        };
    }
    static parseNSPersonNameComponents(input) {
        return [input === null || input === void 0 ? void 0 : input.familyName, input === null || input === void 0 ? void 0 : input.middleName, input === null || input === void 0 ? void 0 : input.givenName].filter(shared_1.isNotEmptyString).join(',');
    }
    static parseCNPhoneNumber(input) {
        var _a;
        return (_a = input === null || input === void 0 ? void 0 : input.stringValue) !== null && _a !== void 0 ? _a : '';
    }
}
exports.IosPaymentResponse = IosPaymentResponse;
//# sourceMappingURL=ios-payment-response.js.map