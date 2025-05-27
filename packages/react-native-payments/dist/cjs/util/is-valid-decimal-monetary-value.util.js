"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDecimalMonetaryValue = void 0;
const validator_1 = require("validator");
const shared_1 = require("@rnw-community/shared");
const isValidStringAmount = (stringAmount) => {
    if (stringAmount.endsWith('.')) {
        return false;
    }
    return validator_1.default.isDecimal(stringAmount);
};
const isValidDecimalMonetaryValue = (amountValue) => {
    if (!(0, shared_1.isNumber)(amountValue) && !(0, shared_1.isString)(amountValue)) {
        return false;
    }
    return (0, shared_1.isNumber)(amountValue) || isValidStringAmount(amountValue);
};
exports.isValidDecimalMonetaryValue = isValidDecimalMonetaryValue;
//# sourceMappingURL=is-valid-decimal-monetary-value.util.js.map