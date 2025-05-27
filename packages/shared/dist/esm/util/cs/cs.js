/**
 * Conditional styling, returns `trueStyle` object if `condition` is true,
 * otherwise returns `falseStyle` object which defaults to `{}`.
 *
 * @param condition Boolean condition
 * @param trueStyle Styling object
 * @param falseStyle Styling object, empty object by default
 *
 * @returns `trueStyle` if condition is _true_ otherwise `falseStyle`
 */
export const cs = (condition, trueStyle, falseStyle) => condition ? trueStyle : (falseStyle ?? {});
//# sourceMappingURL=cs.js.map