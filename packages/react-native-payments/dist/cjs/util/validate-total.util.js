"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTotal = void 0;
const shared_1 = require("@rnw-community/shared");
const is_valid_decimal_monetary_value_util_1 = require("./is-valid-decimal-monetary-value.util");
const isNegative = (amountValue) => (0, shared_1.isNumber)(amountValue) ? amountValue < 0 : amountValue.startsWith('-');
const validateTotal = (total, ErrorType = Error) => {
    // Should Validator take an errorType to pre populate "Failed to construct 'PaymentRequest'"
    if (!(0, shared_1.isDefined)(total)) {
        throw new ErrorType(`required member total is undefined.`);
    }
    // Check that there is a total
    if (!(0, shared_1.isDefined)(total.amount) || !(0, shared_1.isDefined)(total.amount.value) || Number(total.amount.value) === 0) {
        throw new ErrorType(`Missing required member(s): amount, label.`);
    }
    const totalAmountValue = total.amount.value;
    // Check that total is a valid decimal monetary value.
    if (!(0, is_valid_decimal_monetary_value_util_1.isValidDecimalMonetaryValue)(totalAmountValue)) {
        throw new ErrorType(`'${totalAmountValue}' is not a valid amount format for total`);
    }
    // Check that total isn't negative
    if (isNegative(totalAmountValue)) {
        throw new ErrorType(`Total amount value should be non-negative`);
    }
};
exports.validateTotal = validateTotal;
//# sourceMappingURL=validate-total.util.js.map