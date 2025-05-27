import { isDefined } from '@rnw-community/shared';
import { isValidDecimalMonetaryValue } from './is-valid-decimal-monetary-value.util';
export const validateDisplayItems = (displayItems = [], ErrorType = Error) => {
    // Check that the value of each display item is a valid decimal monetary value
    displayItems.forEach(item => {
        // TODO: Can we improve this checks?
        if (!isDefined(item) || !isDefined(item.amount) || !isDefined(item.amount.value)) {
            throw new ErrorType(`required member value is undefined.`);
        }
        if (!isValidDecimalMonetaryValue(item.amount.value)) {
            throw new ErrorType(`'${item.amount.value}' is not a valid amount format for display items`);
        }
    });
};
//# sourceMappingURL=validate-display-items.util.js.map