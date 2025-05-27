import { isDefined } from '../../type-guard/generic/is-defined/is-defined';
/**
 * Returns value if defined otherwise returns default value
 *
 * @param value Value to check
 * @param defaultFn Function returning default value
 * @returns Value if defined otherwise default value
 */
export const getDefined = (value, defaultFn) => isDefined(value) ? value : defaultFn();
//# sourceMappingURL=get-defined.js.map