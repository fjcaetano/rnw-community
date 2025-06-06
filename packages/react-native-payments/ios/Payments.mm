#import "Payments.h"

#import <React/RCTLog.h>
#import <Foundation/Foundation.h>

@interface Payments()

@property (nonatomic, copy) RCTResponseSenderBlock shippingMethodUpdater;
@property (nonatomic, copy) void (^updateShippingMethodCompletion)(PKPaymentRequestShippingMethodUpdate *);

@property (nonatomic, copy) RCTResponseSenderBlock shippingContactUpdater;
@property (nonatomic, copy) void (^updateShippingContactCompletion)(PKPaymentRequestShippingContactUpdate *);

@end

// TODO: Add logs
@implementation Payments

RCT_EXPORT_MODULE()

static const PKMerchantCapability PKMerchantCapabilityUnknown = 9999;
static const PKPaymentNetwork PKPaymentNetworkUnknown = 0;

// https://reactnative.dev/docs/native-modules-ios#threading
- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(show:(NSString *)methodDataString
                        details:(NSDictionary *)details
                        resolve:(RCTPromiseResolveBlock)resolve
                        reject:(RCTPromiseRejectBlock)reject)
{
    self.paymentResolve = resolve;
    self.paymentReject = reject;

    NSData *jsonData = [methodDataString dataUsingEncoding:NSUTF8StringEncoding];

    NSError *error;
    NSDictionary *methodData = [NSJSONSerialization JSONObjectWithData:jsonData options:kNilOptions error:&error];
    if (error) {
        [self rejectPromise:@"wrong_payment_data" message:@"Invalid JSON payment methodData passed" error:nil];
        return;
    }

    NSString *merchantId = methodData[@"merchantIdentifier"];
    NSString *countryCode = methodData[@"countryCode"];
    NSString *currencyCode = methodData[@"currencyCode"];

    if (!merchantId) {
        [self rejectPromise:@"no_merchant_id" message:@"No merchant identifier provided" error:nil];
        return;
    }

    // TODO: Should we add supportedCountries config, if android has the same?
    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/2865929-supportedcountries?language=objc
    if(!countryCode) {
        [self rejectPromise:@"no_country_code" message:@"No country code provided" error:nil];
        return;
    }

    if(!currencyCode) {
        [self rejectPromise:@"no_currency_code" message:@"No currency code provided" error:nil];
        return;
    }

    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/1833288-availablenetworks?language=objc
    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619329-supportednetworks?language=objc
    // https://developer.apple.com/documentation/passkit/pkpaymentnetwork?language=objc
    NSMutableArray *supportedNetworks =  [NSMutableArray array];
    for (NSString *supportedNetwork in methodData[@"supportedNetworks"]) {
        PKPaymentNetwork paymentNetwork = [self paymentNetworkFromString:supportedNetwork];
        if (paymentNetwork != PKPaymentNetworkUnknown) {
            [supportedNetworks addObject:paymentNetwork];
        } else {
            [self rejectPromise:@"invalid_supported_network" message:[NSString stringWithFormat:@"Invalid supportedNetwork passed '%@'", supportedNetwork] error:nil];
            return;
        }
    }

    NSMutableArray *requiredBillingContactFields = [NSMutableArray array];
    for (NSString *requiredBillingContactField in methodData[@"requiredBillingContactFields"]) {
        PKContactField contactField = [self contactFieldFromString:requiredBillingContactField];
        if(contactField != nil) {
            [requiredBillingContactFields addObject:contactField];
        } else {
            [self rejectPromise:@"invalid_contact_field" message:[NSString stringWithFormat:@"Invalid contact field passed '%@'", contactField] error:nil];
            return;
        }
    }

    NSMutableArray *requiredShippingContactFields = [NSMutableArray array];
    for (NSString *requiredShippingContactField in methodData[@"requiredShippingContactFields"]) {
        PKContactField contactField = [self contactFieldFromString:requiredShippingContactField];
        if(contactField != nil) {
            [requiredShippingContactFields addObject:contactField];
        } else {
            [self rejectPromise:@"invalid_contact_field" message:[NSString stringWithFormat:@"Invalid contact field passed '%@'", contactField] error:nil];
            return;
        }
    }


    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619257-merchantcapabilities?language=objc
    NSArray *merchantCapabilitiesArray = methodData[@"merchantCapabilities"];
    PKMerchantCapability merchantCapabilities = 0;
    if (merchantCapabilitiesArray.count > 0) {
        for (NSString *capabilityString in merchantCapabilitiesArray) {
            PKMerchantCapability capability = [self merchantCapabilityFromString:capabilityString];
            if (capability != PKMerchantCapabilityUnknown) {
                merchantCapabilities |= capability;
            } else {
                [self rejectPromise:@"invalid_merchant_capability" message:[NSString stringWithFormat:@"Invalid merchant capability passed '%@'", capabilityString] error:nil];
                return;
            }
        }
    }

    PKPaymentRequest *paymentRequest = [[PKPaymentRequest alloc] init];
    paymentRequest.merchantCapabilities = merchantCapabilities;
    paymentRequest.supportedNetworks = supportedNetworks;

    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619305-merchantidentifier?language=objc
    paymentRequest.merchantIdentifier = merchantId;

    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619246-countrycode?language=objc
    paymentRequest.countryCode = countryCode;

    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619248-currencycode?language=objc
    paymentRequest.currencyCode = currencyCode;

    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619231-paymentsummaryitems?language=objc
    paymentRequest.paymentSummaryItems = [self getPaymentSummaryItemsFromDetails:details];

    // HINT: ShippingOptions is not a part of the W3C Spec anymore
    // https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest/shippingOption
    // https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest/shippingAddress
    paymentRequest.shippingMethods = [self getPaymentShippingMethodsFromDetails:details];

    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/2865928-requiredbillingcontactfields?language=objc
    if(methodData[@"requiredBillingContactFields"]) {
        paymentRequest.requiredBillingContactFields = [NSSet setWithArray:requiredBillingContactFields];
    }

    // https://developer.apple.com/documentation/passkit/pkpaymentrequest/2865927-requiredshippingcontactfields?language=objc
    if(methodData[@"requiredShippingContactFields"]) {
        paymentRequest.requiredShippingContactFields = [NSSet setWithArray:requiredShippingContactFields];
    }

    // https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontroller/1616178-initwithpaymentrequest?language=objc
    self.viewController = [[PKPaymentAuthorizationViewController alloc] initWithPaymentRequest: paymentRequest];
    self.viewController.delegate = self;

    if (!self.viewController) {
        [self rejectPromise:@"no_view_controller" message:@"Failed initializing PKPaymentAuthorizationViewController, check you app ApplePay capabilities and merchantIdentifier" error:nil];
        return;
    }

    UIViewController *rootViewController = RCTPresentedViewController();
    [rootViewController presentViewController:self.viewController animated:YES completion:nil];
}

RCT_EXPORT_METHOD(abort: (RCTPromiseResolveBlock)resolve
                          reject:(RCTPromiseRejectBlock)reject)
{
    [self.viewController dismissViewControllerAnimated:YES completion:^{
        resolve(nil);
    }];
}

RCT_EXPORT_METHOD(complete: (NSString *)paymentStatus
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    PKPaymentAuthorizationStatus status = PKPaymentAuthorizationStatusFailure;

    if ([paymentStatus isEqualToString: @"success"]) {
        status = PKPaymentAuthorizationStatusSuccess;
    }

    self.completion([[PKPaymentAuthorizationResult alloc] initWithStatus:status errors:nil]);

    dispatch_async(dispatch_get_main_queue(), ^{
        if (self.viewController.presentingViewController) {
            [self.viewController dismissViewControllerAnimated:YES completion:^{
                resolve(nil);
            }];
        } else {
            resolve(nil);
        }
    });
}

RCT_EXPORT_METHOD(canMakePayments: (NSString *)methodDataString
                                   resolve:(RCTPromiseResolveBlock)resolve
                                   reject:(RCTPromiseRejectBlock)reject)
{
    // TODO: We can implement https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontroller/1616181-canmakepaymentsusingnetworks?language=objc
    // for this we need to extract parsing and validating methods from the show method and reuse in both places.

    // https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontroller/1616192-canmakepayments?language=objc
    resolve(@([PKPaymentAuthorizationViewController canMakePayments]));
}

RCT_EXPORT_METHOD(onUpdateShippingMethod:(RCTResponseSenderBlock)callback)
{
    self.shippingMethodUpdater = callback;
}

RCT_EXPORT_METHOD(onUpdateShippingContact:(RCTResponseSenderBlock)callback)
{
    self.shippingContactUpdater = callback;
}

RCT_EXPORT_METHOD(updateDisplayItems:(NSArray *)displayItems)
{
    if (displayItems.count == 0 || !self.updateShippingMethodCompletion) return;

    NSArray *summaryItems = [self getPaymentSummaryItemsFromDetails:@{ @"displayItems": displayItems }];
    PKPaymentRequestShippingMethodUpdate *update = [[PKPaymentRequestShippingMethodUpdate alloc] initWithPaymentSummaryItems:summaryItems];
    self.updateShippingMethodCompletion(update);
}


RCT_EXPORT_METHOD(updateShippingOptions:(NSArray *)shippingMethods)
{
    if (shippingMethods.count == 0 || !self.updateShippingContactCompletion) return;

    PKPaymentRequestShippingContactUpdate *update = [PKPaymentRequestShippingContactUpdate new];
    update.shippingMethods = [self getPaymentShippingMethodsFromDetails:@{ @"shippingOptions": shippingMethods }];
    self.updateShippingContactCompletion(update);
}

// DELEGATES https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontrollerdelegate?language=objc

// https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontrollerdelegate/1616180-paymentauthorizationviewcontroll?language=objc
- (void) paymentAuthorizationViewControllerDidFinish:(PKPaymentAuthorizationViewController *)controller
{
    [controller dismissViewControllerAnimated:YES completion:^{
        [self rejectPromise:@"payment_error" message:@"Payment process canceled by user." error:nil];
    }];
}

// https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontrollerdelegate/2865759-paymentauthorizationviewcontroll?language=objc
- (void) paymentAuthorizationViewController:(PKPaymentAuthorizationViewController *)controller
                        didAuthorizePayment:(PKPayment *)payment
                                    handler:(void (^)(PKPaymentAuthorizationResult *result))completion
{
    self.completion = completion;

    NSMutableDictionary *paymentDict = [NSMutableDictionary dictionary];

    NSMutableDictionary *tokenDict = [NSMutableDictionary dictionary];
    tokenDict[@"transactionIdentifier"] = payment.token.transactionIdentifier;

    NSString *paymentData64 = [payment.token.paymentData base64EncodedStringWithOptions:0];
    NSData *decodedPaymentData = [[NSData alloc] initWithBase64EncodedString:paymentData64 options:0];
    tokenDict[@"paymentData"] = [[NSString alloc] initWithData:decodedPaymentData encoding:NSUTF8StringEncoding];

    NSMutableDictionary *paymentMethodDict = [NSMutableDictionary dictionary];
    paymentMethodDict[@"displayName"] = payment.token.paymentMethod.displayName;
    paymentMethodDict[@"network"] = payment.token.paymentMethod.network;
    paymentMethodDict[@"type"] = [self stringFromPaymentMethodType:payment.token.paymentMethod.type];

    tokenDict[@"paymentMethod"] = paymentMethodDict;

    paymentDict[@"token"] = tokenDict;

    PKContact *billingContact = payment.billingContact;
    if (billingContact) {
        NSMutableDictionary *billingContactDict = [NSMutableDictionary dictionary];

        CNPostalAddress *postalAddress = billingContact.postalAddress;
        NSMutableDictionary *postalAddressDict = [NSMutableDictionary dictionary];
        if (postalAddress) {
            postalAddressDict[@"street"] = postalAddress.street;
            postalAddressDict[@"city"] = postalAddress.city;
            postalAddressDict[@"state"] = postalAddress.state;
            postalAddressDict[@"postalCode"] = postalAddress.postalCode;
            postalAddressDict[@"country"] = postalAddress.country;
            postalAddressDict[@"ISOCountryCode"] = postalAddress.ISOCountryCode;
        }

        billingContactDict[@"postalAddress"] = postalAddressDict;

        paymentDict[@"billingContact"] = billingContactDict;
    }

    PKContact *shippingContact = payment.shippingContact;
    if (shippingContact) {
        NSMutableDictionary *shippingContactDict = [NSMutableDictionary dictionary];
        shippingContactDict[@"emailAddress"] = shippingContact.emailAddress;

        CNPhoneNumber *phoneNumber = shippingContact.phoneNumber;
        NSMutableDictionary *phoneNumberDict = [NSMutableDictionary dictionary];
        phoneNumberDict[@"stringValue"] = phoneNumber.stringValue;
        shippingContactDict[@"phoneNumber"] = phoneNumberDict;

        CNPostalAddress *postalAddress = shippingContact.postalAddress;
        NSMutableDictionary *postalAddressDict = [NSMutableDictionary dictionary];
        if (postalAddress) {
            postalAddressDict[@"street"] = postalAddress.street;
            postalAddressDict[@"city"] = postalAddress.city;
            postalAddressDict[@"state"] = postalAddress.state;
            postalAddressDict[@"postalCode"] = postalAddress.postalCode;
            postalAddressDict[@"country"] = postalAddress.country;
            postalAddressDict[@"ISOCountryCode"] = postalAddress.ISOCountryCode;
        }
        shippingContactDict[@"postalAddress"] = postalAddressDict;

        NSPersonNameComponents *nameComponents = shippingContact.name;
        NSMutableDictionary *nameDict = [NSMutableDictionary dictionary];
        if (nameComponents) {
            nameDict[@"givenName"] = nameComponents.givenName;
            nameDict[@"familyName"] = nameComponents.familyName;
            nameDict[@"middleName"] = nameComponents.middleName;
            nameDict[@"namePrefix"] = nameComponents.namePrefix;
            nameDict[@"nameSuffix"] = nameComponents.nameSuffix;
            nameDict[@"nickname"] = nameComponents.nickname;
        }
        shippingContactDict[@"name"] = nameDict;

        paymentDict[@"shippingContact"] = shippingContactDict;
    }

    // TODO: Add shippingMethod

    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:paymentDict options:NSJSONWritingPrettyPrinted error:&error];

    if (!jsonData) {
        [self rejectPromise:@"json_serialization_error" message:@"Failed to serialize PKPayment to JSON." error:error];
    } else {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        self.paymentResolve(jsonString);
    }

    self.paymentReject = nil;
    self.paymentResolve = nil;
}

- (void)paymentAuthorizationViewController:(PKPaymentAuthorizationViewController *) controller
                   didSelectShippingMethod:(PKShippingMethod *) shippingMethod
                                   handler:(void (^)(PKPaymentRequestShippingMethodUpdate * requestUpdate)) completion
{
    self.updateShippingMethodCompletion = completion;

    if (self.shippingMethodUpdater) {
        self.shippingMethodUpdater(@[NSNull.null, shippingMethod.identifier]);
    }
}

- (void)paymentAuthorizationViewController:(PKPaymentAuthorizationViewController *) controller
                  didSelectShippingContact:(PKContact *) contact
                                   handler:(void (^)(PKPaymentRequestShippingContactUpdate * update)) completion
{
    self.updateShippingContactCompletion = completion;
    if (self.shippingContactUpdater) {
        self.shippingContactUpdater(@[NSNull.null, @{
            @"email": contact.emailAddress ?: NSNull.null,
            @"name": contact.name ?: NSNull.null,
            @"phone": contact.phoneNumber.stringValue ?: NSNull.null,
            @"administrativeArea": contact.postalAddress.state ?: NSNull.null,
            @"country": contact.postalAddress.country ?: NSNull.null,
            @"countryCode": contact.postalAddress.ISOCountryCode ?: NSNull.null,
            @"locality": contact.postalAddress.city ?: NSNull.null,
            @"postalCode": contact.postalAddress.postalCode ?: NSNull.null,
            @"subAdministrativeArea": contact.postalAddress.subAdministrativeArea ?: NSNull.null,
            @"subLocality": contact.postalAddress.subLocality ?: NSNull.null,
            @"familyName": contact.name.familyName ?: NSNull.null,
            @"givenName": contact.name.givenName ?: NSNull.null,
        }]);
    }
}

// PRIVATE METHODS

- (PKPaymentSummaryItem *_Nonnull)convertDisplayItemToPaymentSummaryItem:(NSDictionary *_Nonnull)displayItem;
{
    NSDecimalNumber *decimalNumberAmount = [NSDecimalNumber decimalNumberWithString:displayItem[@"amount"][@"value"]];
    PKPaymentSummaryItem *paymentSummaryItem = [PKPaymentSummaryItem summaryItemWithLabel:displayItem[@"label"] amount:decimalNumberAmount];

    return paymentSummaryItem;
}

// https://developer.apple.com/documentation/passkit/pkpaymentrequest/1619231-paymentsummaryitems?language=objc
- (NSArray<PKPaymentSummaryItem *> *_Nonnull)getPaymentSummaryItemsFromDetails:(NSDictionary *_Nonnull)details
{
    NSMutableArray <PKPaymentSummaryItem *> *paymentSummaryItems = [NSMutableArray array];

    NSArray *displayItems = details[@"displayItems"];
    if (displayItems.count > 0) {
        for (NSDictionary *displayItem in displayItems) {
            [paymentSummaryItems addObject: [self convertDisplayItemToPaymentSummaryItem:displayItem]];
        }
    }

    // Let's not handle this separately
//    NSDictionary *total = details[@"total"];
//    [paymentSummaryItems addObject: [self convertDisplayItemToPaymentSummaryItem:total]];

    return paymentSummaryItems;
}

- (PKShippingMethod *_Nonnull)convertShippingMethod:(NSDictionary *_Nonnull)shippingOption
{
    NSDecimalNumber *amount = [NSDecimalNumber decimalNumberWithString:shippingOption[@"amount"][@"value"]];
    PKShippingMethod *shippingMethod = [PKShippingMethod summaryItemWithLabel:shippingOption[@"label"] amount:amount];

    shippingMethod.identifier = shippingOption[@"id"];
    shippingMethod.detail = shippingOption[@"detail"];

    NSDictionary *dateRange = shippingOption[@"dateRange"];
    if (dateRange)  {
        NSCalendar *calendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];

        NSDate *startDate = [NSDate dateWithTimeIntervalSince1970:[dateRange[@"startDate"] doubleValue]];
        NSDateComponents *startDateComponents = [calendar components:NSUIntegerMax fromDate:startDate];

        NSDate *endDate = [NSDate dateWithTimeIntervalSince1970:[dateRange[@"endDate"] doubleValue]];
        NSDateComponents *endDateComponents = [calendar components:NSUIntegerMax fromDate:endDate];

        shippingMethod.dateComponentsRange = [[PKDateComponentsRange alloc] initWithStartDateComponents:startDateComponents endDateComponents:endDateComponents];
    }

    return shippingMethod;
}

- (NSArray<PKShippingMethod *> *_Nonnull)getPaymentShippingMethodsFromDetails:(NSDictionary *_Nonnull)details
{
    NSMutableArray <PKShippingMethod *> *paymentShippingOptions = [NSMutableArray array];

    NSArray *shippingOptions = details[@"shippingOptions"];
    if (shippingOptions.count > 0) {
        for (NSDictionary *shippingOption in shippingOptions) {
            [paymentShippingOptions addObject:[self convertShippingMethod:shippingOption]];
        }
    }

    return paymentShippingOptions;
}

- (PKPaymentNetwork)paymentNetworkFromString:(NSString *)paymentNetworkString {
    static NSDictionary<NSString *, PKPaymentNetwork> *paymentNetworks;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        paymentNetworks = @{
            @"PKPaymentNetworkAmex": PKPaymentNetworkAmex,
            @"PKPaymentNetworkDiscover": PKPaymentNetworkDiscover,
            @"PKPaymentNetworkMasterCard": PKPaymentNetworkMasterCard,
            @"PKPaymentNetworkVisa": PKPaymentNetworkVisa,
            @"PKPaymentNetworkChinaUnionPay": PKPaymentNetworkChinaUnionPay,
            @"PKPaymentNetworkInterac": PKPaymentNetworkInterac,
            @"PKPaymentNetworkPrivateLabel": PKPaymentNetworkPrivateLabel,
            @"PKPaymentNetworkSuica": PKPaymentNetworkSuica,
            @"PKPaymentNetworkIDCredit": PKPaymentNetworkIDCredit,
            @"PKPaymentNetworkQuicPay": PKPaymentNetworkQuicPay,
            @"PKPaymentNetworkJCB": PKPaymentNetworkJCB,
            @"PKPaymentNetworkMaestro": PKPaymentNetworkMaestro,
            @"PKPaymentNetworkEftpos": PKPaymentNetworkEftpos,
            @"PKPaymentNetworkCartesBancaires": PKPaymentNetworkCartesBancaires,
            @"PKPaymentNetworkVPay": PKPaymentNetworkVPay,
            @"PKPaymentNetworkMada": PKPaymentNetworkMada,
            @"PKPaymentNetworkElectron": PKPaymentNetworkElectron,
            @"PKPaymentNetworkElo": PKPaymentNetworkElo
        };

        if (@available(iOS 16.0, *)) {
            NSMutableDictionary *mutablePaymentNetworks = [paymentNetworks mutableCopy];
            mutablePaymentNetworks[@"PKPaymentNetworkBancontact"] = PKPaymentNetworkBancontact;
            paymentNetworks = [mutablePaymentNetworks copy];
        }

        if (@available(iOS 15.1, *)) {
            NSMutableDictionary *mutablePaymentNetworks = [paymentNetworks mutableCopy];
            mutablePaymentNetworks[@"PKPaymentNetworkDankort"] = PKPaymentNetworkDankort;
            paymentNetworks = [mutablePaymentNetworks copy];
        }

        if (@available(iOS 14.5, *)) {
            NSMutableDictionary *mutablePaymentNetworks = [paymentNetworks mutableCopy];
            // HINT: You should never work
            mutablePaymentNetworks[@"PKPaymentNetworkMIR"] = PKPaymentNetworkMir;
            paymentNetworks = [mutablePaymentNetworks copy];
        }

        if (@available(iOS 14.0, *)) {
            NSMutableDictionary *mutablePaymentNetworks = [paymentNetworks mutableCopy];
            mutablePaymentNetworks[@"PKPaymentNetworkGirocard"] = PKPaymentNetworkGirocard;
            mutablePaymentNetworks[@"PKPaymentNetworkBarcode"] = PKPaymentNetworkBarcode;
            paymentNetworks = [mutablePaymentNetworks copy];
        }

        if (@available(iOS 12.0, *)) {
            NSMutableDictionary *mutablePaymentNetworks = [paymentNetworks mutableCopy];
            mutablePaymentNetworks[@"PKPaymentNetworkCartesBancaires"] = PKPaymentNetworkCartesBancaires;
            mutablePaymentNetworks[@"PKPaymentNetworkVPay"] = PKPaymentNetworkVPay;
            mutablePaymentNetworks[@"PKPaymentNetworkEftpos"] = PKPaymentNetworkEftpos;
            mutablePaymentNetworks[@"PKPaymentNetworkMaestro"] = PKPaymentNetworkMaestro;
            paymentNetworks = [mutablePaymentNetworks copy];
        }
    });

    return paymentNetworks[paymentNetworkString] ?: PKPaymentNetworkUnknown;
}

- (PKMerchantCapability)merchantCapabilityFromString:(NSString *)capabilityString {
    NSDictionary *capabilityMap = @{
        @"PKMerchantCapability3DS": @(PKMerchantCapability3DS),
        @"PKMerchantCapabilityEMV": @(PKMerchantCapabilityEMV),
        @"PKMerchantCapabilityCredit": @(PKMerchantCapabilityCredit),
        @"PKMerchantCapabilityDebit": @(PKMerchantCapabilityDebit)
    };

    NSNumber *mappedCapabilityNumber = capabilityMap[capabilityString];
    if (mappedCapabilityNumber != nil) {
        return (PKMerchantCapability)mappedCapabilityNumber.unsignedLongValue;
    } else {
        return PKMerchantCapabilityUnknown;
    }
}

- (PKContactField)contactFieldFromString:(NSString *)inputString {
    NSDictionary<NSString *, PKContactField> *contactFieldMapping = @{
        @"PKContactFieldName": PKContactFieldName,
        @"PKContactFieldPostalAddress": PKContactFieldPostalAddress,
        @"PKContactFieldEmailAddress": PKContactFieldEmailAddress,
        @"PKContactFieldPhoneNumber": PKContactFieldPhoneNumber,
    };

    PKContactField field = contactFieldMapping[inputString];

    return field;
}

- (NSString *)stringFromPaymentMethodType:(PKPaymentMethodType)type {
    switch (type) {
        case PKPaymentMethodTypeUnknown:
            return @"PKPaymentMethodTypeUnknown";
        case PKPaymentMethodTypeDebit:
            return @"PKPaymentMethodTypeDebit";
        case PKPaymentMethodTypeCredit:
            return @"PKPaymentMethodTypeCredit";
        case PKPaymentMethodTypePrepaid:
            return @"PKPaymentMethodTypePrepaid";
        case PKPaymentMethodTypeStore:
            return @"PKPaymentMethodTypeStore";
        default:
            return @"PKPaymentMethodTypeUnknown";
    }
}

- (void)rejectPromise:(NSString *)errorCode message:(NSString *)message  error:(NSError *)error {
    if (self.paymentReject) {
        self.paymentReject(errorCode, message, error);
    }

    self.paymentReject = nil;
    self.paymentResolve = nil;
}


// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativePaymentsSpecJSI>(params);
}
#endif

@end

