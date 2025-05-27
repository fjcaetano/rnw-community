"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDisplayItems = void 0;
const shared_1 = require("@rnw-community/shared");
const is_valid_decimal_monetary_value_util_1 = require("./is-valid-decimal-monetary-value.util");
const validateDisplayItems = (displayItems = [], ErrorType = Error) => {
    // Check that the value of each display item is a valid decimal monetary value
    displayItems.forEach(item => {
        // TODO: Can we improve this checks?
        if (!(0, shared_1.isDefined)(item) || !(0, shared_1.isDefined)(item.amount) || !(0, shared_1.isDefined)(item.amount.value)) {
            throw new ErrorType(`required member value is undefined.`);
        }
        if (!(0, is_valid_decimal_monetary_value_util_1.isValidDecimalMonetaryValue)(item.amount.value)) {
            throw new ErrorType(`'${item.amount.value}' is not a valid amount format for display items`);
        }
    });
};
exports.validateDisplayItems = validateDisplayItems;
//# sourceMappingURL=validate-display-items.util.js.map