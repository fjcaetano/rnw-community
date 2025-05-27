"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = void 0;
const is_defined_1 = require("../is-defined/is-defined");
/*
 * HINT: https://promisesaplus.com/#the-promise-resolution-procedure
 */
const isPromise = (value) => (typeof value === 'object' || typeof value === 'function') &&
    (0, is_defined_1.isDefined)(value) &&
    'then' in value &&
    typeof value.then === 'function';
exports.isPromise = isPromise;
//# sourceMappingURL=is-promise.js.map