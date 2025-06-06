import type { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
    abort: () => Promise<void>;
    canMakePayments: (methodData: string) => Promise<boolean>;
    complete: (paymentComplete: string) => Promise<void>;
    onUpdateShippingContact: (cb: (error: Object, shippingContact: Object) => void) => void;
    onUpdateShippingMethod: (cb: (error: Object, shippingMethodId: string) => void) => void;
    show: (methodData: string, details: Object) => Promise<string>;
    updateDisplayItems: (displayItems: PaymentItem[]) => void;
    updateShippingOptions: (shippingOptions: PaymentShippingOption[]) => void;
}
declare const _default: Spec | null;
export default _default;
//# sourceMappingURL=NativePayments.d.ts.map