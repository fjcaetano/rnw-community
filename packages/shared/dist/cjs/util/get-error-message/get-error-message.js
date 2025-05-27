"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
const is_error_1 = require("../../type-guard/generic/is-error/is-error");
/**
 * Get Error message as string type-safely, or show fallback message.
 *
 * This util should be used inside catch blocks to get error message text type-safely when
 * using `catch(err:unknown)...`
 *
 * @param err unknown Instance of Error from catch block
 * @param fallback string Fallback message if err is not an instance of Error
 *
 * @returns string
 */
const getErrorMessage = (err, fallback = '') => ((0, is_error_1.isError)(err) ? err.message : fallback);
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=get-error-message.js.map