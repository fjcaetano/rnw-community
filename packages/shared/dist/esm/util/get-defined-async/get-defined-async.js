import { isDefined } from '../../type-guard/generic/is-defined/is-defined';
export const getDefinedAsync = (value, defaultFn) => isDefined(value) ? Promise.resolve(value) : defaultFn();
//# sourceMappingURL=get-defined-async.js.map