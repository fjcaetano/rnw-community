import type { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
    abort: () => Promise<void>;
    canMakePayments: (methodData: string) => Promise<boolean>;
    complete: (paymentComplete: string) => Promise<void>;
    show: (methodData: string, details: Object) => Promise<string>;
    onUpdateShippingMethod: (cb: (error: Object, shippingMethodId: string) => void) => void;
    updateDisplayItems: (displayItems: PaymentItem[]) => void;
}
declare const _default: Spec | null;
export default _default;
//# sourceMappingURL=NativePayments.d.ts.map