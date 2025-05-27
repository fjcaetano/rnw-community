import { isDefined } from '../is-defined/is-defined';
/*
 * HINT: https://promisesaplus.com/#the-promise-resolution-procedure
 */
export const isPromise = (value) => (typeof value === 'object' || typeof value === 'function') &&
    isDefined(value) &&
    'then' in value &&
    typeof value.then === 'function';
//# sourceMappingURL=is-promise.js.map