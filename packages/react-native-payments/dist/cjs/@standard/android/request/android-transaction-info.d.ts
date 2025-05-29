export interface AndroidTransactionInfo {
    checkoutOption?: 'COMPLETE_IMMEDIATE_PURCHASE' | 'DEFAULT';
    countryCode?: string;
    currencyCode: string;
    totalPrice: string;
    totalPriceLabel?: string;
    totalPriceStatus: 'ESTIMATED' | 'FINAL' | 'NOT_CURRENTLY_KNOWN';
    transactionId?: string;
}
export declare const defaultAndroidTransactionInfo: AndroidTransactionInfo;
//# sourceMappingURL=android-transaction-info.d.ts.map