import validator from 'validator';
import { isNumber, isString } from '@rnw-community/shared';
const isValidStringAmount = (stringAmount) => {
    if (stringAmount.endsWith('.')) {
        return false;
    }
    return validator.isDecimal(stringAmount);
};
export const isValidDecimalMonetaryValue = (amountValue) => {
    if (!isNumber(amountValue) && !isString(amountValue)) {
        return false;
    }
    return isNumber(amountValue) || isValidStringAmount(amountValue);
};
//# sourceMappingURL=is-valid-decimal-monetary-value.util.js.map